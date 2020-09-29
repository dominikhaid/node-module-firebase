let startAt = db.collection('cities').orderBy('population').startAt(1000000)

let endAt = db.collection('cities').orderBy('population').endAt(1000000)

let docRef = db.collection('cities').doc('SF')
return docRef.get().then((snapshot) => {
  let startAtSnapshot = db
    .collection('cities')
    .orderBy('population')
    .startAt(snapshot)

  return startAtSnapshot.limit(10).get()
})

let first = db.collection('cities').orderBy('population').limit(3)

let paginate = first.get().then((snapshot) => {
  // ...

  // Get the last document
  let last = snapshot.docs[snapshot.docs.length - 1]

  // Construct a new query starting at this document.
  // Note: this will not have the desired effect if multiple
  // cities have the exact same population value.
  let next = db
    .collection('cities')
    .orderBy('population')
    .startAfter(last.data().population)
    .limit(3)

  // Use the query for pagination
  // ...
})

// Will return all Springfields
let startAtName = db
  .collection('cities')
  .orderBy('name')
  .orderBy('state')
  .startAt('Springfield')

// Will return 'Springfield, Missouri' and 'Springfield, Wisconsin'
let startAtNameAndState = db
  .collection('cities')
  .orderBy('name')
  .orderBy('state')
  .startAt('Springfield', 'Missouri')
