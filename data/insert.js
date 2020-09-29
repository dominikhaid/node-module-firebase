const restaurants = require('./restaurants');
const ratings = require('./rating');
const users = require('./user');
const fireAdminDB = require('../src/includes/firebase/db').fireAdminDB;
const fireAdmin = require('firebase-admin');

async function createUser(data) {
  data.forEach((element, index, array) => {
    fireAdmin
      .auth()
      .createUser(element)
      .then(function (userRecord) {
        console.log(index === array.length - 1);
        if (index === array.length - 1) process.exit(0);

        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch(function (error) {
        console.log(index === array.length - 1);
        if (index === array.length - 1) process.exit(0);
        console.log('Error creating new user:', error);
      });
  });
  console.log(`
		_____________

		Users created
		_____________`);
}

fireAdminDB().then(res => {
  let resRef = fireAdmin.firestore().collection('restaurants');
  let query1 = restaurants.restaurants.map(element => {
    let id = element.id;
    delete element.id;
    return (
      resRef.doc(id).set(element),
      resRef
        .doc(id)
        .collection('ratings')
        .doc()
        .set(ratings[Math.floor(Math.random() * 3)])
    );
  });

  Promise.all(query1).then(res => {
    console.log(res);
    console.log(`
		_____________________

		Ratings & Restaurants
		      created
		_____________________`);
    createUser(users.users);
  });
});
