/**
 * NEW COLLECTION
 */
let docRef = db.collection('users').doc('alovelace')

let setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815,
})

/**
 * ADD NEW document
 */

let aTuringRef = db.collection('users').doc('aturing')

let setAlan = aTuringRef.set({
  first: 'Alan',
  middle: 'Mathison',
  last: 'Turing',
  born: 1912,
})

/**
 * Get collection
 */
db.collection('users')
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data())
    })
  })
  .catch((err) => {
    console.log('Error getting documents', err)
  })

/**
 * Get Reference
 */

let alovelaceDocumentRef = db.collection('users').doc('alovelace')
alovelaceDocumentRef.get().then((snapshot) => {
  console.log(snapshot._fieldsProto)
})

/**
 * Nested
 */
let messageRef = db
  .collection('rooms')
  .doc('roomA')
  .collection('messages')
  .doc('message1')

messageRef.set({})

/**
 * Addd Document
 */
let data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA',
}

// Add a new document in collection "cities" with ID 'LA'
let setDoc = db.collection('cities').doc('LA').set(data)

/**
 * DataTypes
 */

let data = {
  stringExample: 'Hello, World!',
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: fireAdmin.firestore.Timestamp.fromDate(
    new Date('December 10, 1815')
  ),
  arrayExample: [5, true, 'hello'],
  nullExample: null,
  objectExample: {
    a: 5,
    b: true,
  },
}

/**
 * New Doc with id
 */
db.collection('cities').doc('new-city-id').set(data)
// Add a new document with a generated id.
let addDoc = db
  .collection('cities')
  .add({
    name: 'Tokyo',
    country: 'Japan',
  })
  .then((ref) => {
    console.log('Added document with ID: ', ref.id)
  })
//STORES THE ID
console.log(addDoc)
