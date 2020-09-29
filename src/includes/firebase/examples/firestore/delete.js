let deleteDoc = db.collection('cities').doc('DC').delete()

// Get the `FieldValue` object
let FieldValue = require('firebase-admin').firestore.FieldValue

// Create a document reference
let cityRef = db.collection('cities').doc('BJ')

// Remove the 'capital' field from the document
let removeCapital = cityRef.update({
  capital: FieldValue.delete(),
})

function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath)
  let query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject)
  })
}

function deleteQueryBatch(db, query, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0
      }

      // Delete documents in a batch
      let batch = db.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => {
        return snapshot.size
      })
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject)
      })
    })
    .catch(reject)
}
