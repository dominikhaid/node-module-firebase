const fireAdmin = require('firebase-admin');
const serviceAccount = require('../../../config/firebase-service.json');

async function fireAdminDB() {
  if (!fireAdmin.INTERNAL.apps_['[DEFAULT]']) {
    let result = await fireAdmin.initializeApp({
      credential: fireAdmin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    return result;
  } else {
    return !fireAdmin.INTERNAL._apps;
  }
}

module.exports.fireAdminDB = fireAdminDB;
