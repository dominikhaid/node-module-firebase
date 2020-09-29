/**
 * Merger Date
 */

let cityRef = db.collection('cities').doc('LA')

let setWithOptions = cityRef.set(
  {
    state: 'CAL',
    capital: false,
  },
  { merge: true }
)

/**
 * Update Fields
 */
let cityRef = db.collection('cities').doc('LA')

// Set the 'capital' field of the city
let updateSingle = cityRef.update({ capital: true })

// Get the `FieldValue` object
let FieldValue = require('firebase-admin').firestore.FieldValue

// Create a document reference
let docRef = db.collection('cities').doc('LA')

// Update the timestamp field with the value from the server
let updateTimestamp = docRef.update({
  timestamp: FieldValue.serverTimestamp(),
})

let initialData = {
  name: 'Frank',
  age: 12,
  favorites: {
    food: 'Pizza',
    color: 'Blue',
    subject: 'recess',
  },
}

// ...
let updateNested = db.collection('users').doc('Frank').update({
  age: 13,
  'favorites.color': 'Red',
})

/**
 * Update Arry Fields
 */
let washingtonRef = db.collection('cities').doc('0vcHtLAOLdtrVcjQKalY')

// Atomically add a new region to the "regions" array field.
let arrUnion = washingtonRef.update({
  regions: fireAdmin.firestore.FieldValue.arrayUnion('greater_virginia'),
})
// Atomically remove a region from the "regions" array field.
let arrRm = washingtonRef.update({
  regions: fireAdmin.firestore.FieldValue.arrayRemove('east_coast'),
})

let washingtonRef = db.collection('cities').doc('0vcHtLAOLdtrVcjQKalY')

// Atomically increment the population of the city by 50.
let popIncrement = washingtonRef.update({
  Citiecins: fireAdmin.firestore.FieldValue.increment(50),
})
