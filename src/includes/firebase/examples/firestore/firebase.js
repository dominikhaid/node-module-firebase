const startDotenv = require('../bin/env').startDotenv
startDotenv()

const fireAdmin = require('firebase-admin')
const serviceAccount = require('../gitignore/dominikhaid-1576294119040-firebase-adminsdk-kzt6d-ea27633196.json')

async function fireAdminDB() {
  let result = await fireAdmin.initializeApp({
    credential: fireAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://dominikhaid-1576294119040.firebaseio.com',
  })
  return result
}
fireAdminDB()

const db = fireAdmin.firestore()

/**
 * Create Data
 */
// var citiesRef = db.collection('cities')

// citiesRef.doc('SF').set({
//   name: 'San Francisco',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 860000,
//   regions: ['west_coast', 'norcal'],
// })
// citiesRef.doc('LA').set({
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 3900000,
//   regions: ['west_coast', 'socal'],
// })
// citiesRef.doc('DC').set({
//   name: 'Washington, D.C.',
//   state: null,
//   country: 'USA',
//   capital: true,
//   population: 680000,
//   regions: ['east_coast'],
// })
// citiesRef.doc('TOK').set({
//   name: 'Tokyo',
//   state: null,
//   country: 'Japan',
//   capital: true,
//   population: 9000000,
//   regions: ['kanto', 'honshu'],
// })
// citiesRef.doc('BJ').set({
//   name: 'Beijing',
//   state: null,
//   country: 'China',
//   capital: true,
//   population: 21500000,
//   regions: ['jingjinji', 'hebei'],
// })

/**
 * Single
 */

// let cityRef = db.collection('cities').doc('SF')
// let getDoc = cityRef
//   .get()
//   .then((doc) => {
//     if (!doc.exists) {
//       console.log('No such document!')
//     } else {
//       console.log('Document data:', doc.data())
//     }
//   })
//   .catch((err) => {
//     console.log('Error getting document', err)
//   })

/**
 * Multi
 */
// let citiesRef = db.collection('cities')
// let query = citiesRef
//   .where('capital', '==', true)
//   .get()
//   .then((snapshot) => {
//     if (snapshot.empty) {
//       console.log('No matching documents.')
//       return
//     }

//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data())
//     })
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err)
//   })

// let citiesRef = db.collection('cities')
// let allCities = citiesRef
//   .get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data())
//     })
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err)
//   })

/**
 * Sub Documents
 */
// let sfRef = db.collection('cities').doc('SF')
// sfRef.listCollections().then((collections) => {
//   collections.forEach((collection) => {
//     console.log('Found subcollection with id:', collection.id)
//   })
// })

/**
 * New data
 */
let citiesRef = db.collection('cities')

// let setSf = citiesRef.doc('SF').set({
//   name: 'San Francisco',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 860000,
//   regions: ['west_coast', 'norcal'],
// })
// let setLa = citiesRef.doc('LA').set({
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 3900000,
//   regions: ['west_coast', 'socal'],
// })
// let setDc = citiesRef.doc('DC').set({
//   name: 'Washington, D.C.',
//   state: null,
//   country: 'USA',
//   capital: true,
//   population: 680000,
//   regions: ['east_coast'],
// })
// let setTok = citiesRef.doc('TOK').set({
//   name: 'Tokyo',
//   state: null,
//   country: 'Japan',
//   capital: true,
//   population: 9000000,
//   regions: ['kanto', 'honshu'],
// })
// let setBj = citiesRef.doc('BJ').set({
//   name: 'Beijing',
//   state: null,
//   country: 'China',
//   capital: true,
//   population: 21500000,
//   regions: ['jingjinji', 'hebei'],
// })

// Create a query against the collection
let queryRef = citiesRef.where('capital', '==', true)
let query = queryRef

let stateQuery = citiesRef.where('state', '==', 'CA')

let populationQuery = citiesRef.where('population', '<', 1000000)

let nameQuery = citiesRef.where('name', '>=', 'San Francisco')

let westCoastCities = citiesRef.where('regions', 'array-contains', 'west_coast')

const usaOrJapan = citiesRef.where('country', 'in', ['USA', 'Japan'])

const coastalCities = citiesRef.where('regions', 'array-contains-any', [
  'west_coast',
  'east_coast',
])

citiesRef.where('state', '==', 'CO').where('name', '==', 'Denver')
citiesRef.where('state', '==', 'CA').where('population', '<', 1000000)

citiesRef.where('state', '==', 'CA').where('population', '>', 1000000)
citiesRef.where('state', '>=', 'CA').where('state', '<=', 'IN')

let landmarks = Promise.all([
  citiesRef.doc('SF').collection('landmarks').doc().set({
    name: 'Golden Gate Bridge',
    type: 'bridge',
  }),
  citiesRef.doc('SF').collection('landmarks').doc().set({
    name: 'Legion of Honor',
    type: 'museum',
  }),
  citiesRef.doc('LA').collection('landmarks').doc().set({
    name: 'Griffith Park',
    type: 'park',
  }),
  citiesRef.doc('LA').collection('landmarks').doc().set({
    name: 'The Getty',
    type: 'museum',
  }),
  citiesRef.doc('DC').collection('landmarks').doc().set({
    name: 'Lincoln Memorial',
    type: 'memorial',
  }),
  citiesRef.doc('DC').collection('landmarks').doc().set({
    name: 'National Air and Space Museum',
    type: 'museum',
  }),
  citiesRef.doc('TOK').collection('landmarks').doc().set({
    name: 'Ueno Park',
    type: 'park',
  }),
  citiesRef.doc('TOK').collection('landmarks').doc().set({
    name: 'National Museum of Nature and Science',
    type: 'museum',
  }),
  citiesRef.doc('BJ').collection('landmarks').doc().set({
    name: 'Jingshan Park',
    type: 'park',
  }),
  citiesRef.doc('BJ').collection('landmarks').doc().set({
    name: 'Beijing Ancient Observatory',
    type: 'museum',
  }),
])

let museums = db.collectionGroup('landmarks').where('type', '==', 'museum')
museums.get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    console.log(doc.id, ' => ', doc.data())
  })
})

let firstThree = citiesRef.orderBy('name').limit(3)

let lastThree = citiesRef.orderBy('name', 'desc').limit(3)
let byStateByPop = citiesRef.orderBy('state').orderBy('population', 'desc')
let biggest = citiesRef
  .where('population', '>', 2500000)
  .orderBy('population')
  .limit(2)
citiesRef.where('population', '>', 2500000).orderBy('population')
