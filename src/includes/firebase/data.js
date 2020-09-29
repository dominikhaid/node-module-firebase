const fireAdminDB = require('./db').fireAdminDB;
const fireAdmin = require('firebase-admin');

const setRestaurant = obj => {
  let newObj = new Object();
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key === 'id') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'name') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'avgRating') {
      newObj[key] = Number(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'city') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'category') {
      newObj[key] = decodeURIComponent(obj[key]);
    }

    if (obj.hasOwnProperty(key) && key === 'price') {
      newObj[key] = Number(obj[key]);
    }

    if (obj.hasOwnProperty(key) && key === 'numRatings') {
      newObj[key] = Number(obj[key]);
    }

    if (obj.hasOwnProperty(key) && key === 'photo') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
  }
  return newObj;
};

const setRating = obj => {
  let newObj = new Object();
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key === 'resId') {
      newObj[key] = obj[key];
    }
    if (obj.hasOwnProperty(key) && key === 'rateId') {
      newObj[key] = obj[key];
    }
    if (obj.hasOwnProperty(key) && key === 'rating') {
      newObj[key] = Number(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'text') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'timestamp') {
      newObj[key] = fireAdmin.firestore().FieldValue.serverTimestamp();
    }
    if (obj.hasOwnProperty(key) && key === 'userId') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
    if (obj.hasOwnProperty(key) && key === 'userName') {
      newObj[key] = decodeURIComponent(obj[key]);
    }
  }
  return newObj;
};

async function status() {
  return fireAdminDB().then(res => {
    let name = fireAdmin.app().name;
    return name;
  });
}

module.exports.status = status;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function findOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let options = queryFields
    ? setRestaurant(queryFields)
    : bodyFields
    ? setRestaurant(bodyFields)
    : null;

  let db = await fireAdminDB();
  async function getData(params) {
    let rest = await fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(options.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          return false;
        } else {
          return {id: doc.id, ...doc.data()};
        }
      })
      .catch(err => {
        throw err;
      });

    if (!rest) return {error: 20, msg: 'No matching restaurant found'};

    let ratings = await fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(rest.id)
      .collection('ratings')
      .get()
      .then(docs => {
        let docsResult = [];
        docs.forEach(doc => {
          docsResult.push({id: doc.id, ...doc.data()});
        });
        return docsResult;
      })
      .catch(err => {
        throw err;
      });

    return {...rest, ratings};
  }

  return getData();
}

module.exports.findOne = findOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function search(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'name',
    'category',
    'photo',
    'city',
    'numRatings',
    'price',
    'avgRating',
  ]);

  let options = queryFields ? queryFields : bodyFields;
  options = setRestaurant(options);

  let db = await fireAdminDB();

  function buildOne(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]]);
    return base;
  }

  function buildTwo(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]]);
    return base;
  }

  function buildThree(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]])
      .where(key[2], '==', obj[key[2]]);
    return base;
  }

  function buildFour(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]])
      .where(key[2], '==', obj[key[2]])
      .where(key[3], '==', obj[key[3]]);
    return base;
  }

  function buildFive(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]])
      .where(key[2], '==', obj[key[2]])
      .where(key[3], '==', obj[key[3]])
      .where(key[4], '==', obj[key[4]]);
    return base;
  }

  function buildSix(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]])
      .where(key[2], '==', obj[key[2]])
      .where(key[3], '==', obj[key[3]])
      .where(key[4], '==', obj[key[4]])
      .where(key[5], '==', obj[key[5]]);
    return base;
  }

  function buildSeven(coll, obj) {
    let key = Object.keys(obj);
    let base = fireAdmin
      .firestore()
      .collection(coll)
      .where(key[0], '==', obj[key[0]])
      .where(key[1], '==', obj[key[1]])
      .where(key[2], '==', obj[key[2]])
      .where(key[3], '==', obj[key[3]])
      .where(key[4], '==', obj[key[4]])
      .where(key[5], '==', obj[key[5]])
      .where(key[6], '==', obj[key[6]]);
    return base;
  }

  function getData(coll, options) {
    let keyLength = Object.keys(options).length;
    switch (keyLength) {
      case 1:
        return buildOne(coll, options);
        break;
      case 2:
        return buildTwo(coll, options);
        break;

      case 3:
        return buildThree(coll, options);
        break;
      case 4:
        return buildFour(coll, options);
        break;
      case 5:
        return buildFive(coll, options);
        break;
      case 6:
        return buildSix(coll, options);
        break;
      case 7:
        return buildSeven(coll, options);
        break;
      default:
        break;
    }
  }

  let rest = await getData('restaurants', options)
    .get()
    .then(docs => {
      if (docs.empty) {
        return false;
      }

      let docsResult = [];
      docs.forEach(doc => {
        docsResult.push({id: doc.id, ...doc.data()});
      });
      return docsResult;
    })
    .catch(err => {
      throw err;
    });

  if (!rest) return {error: 20, msg: 'No matching restaurant found'};

  if (rest.length === 1) {
    let ratings = await fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(rest[0].id)
      .collection('ratings')
      .get()
      .then(docs => {
        let docsResult = [];
        docs.forEach(doc => {
          docsResult.push({id: doc.id, ...doc.data()});
        });
        return docsResult;
      })
      .catch(err => {
        throw err;
      });

    return {...rest, ratings};
  }

  return rest;
}

module.exports.search = search;

async function findAll() {
  return fireAdminDB().then(res => {
    return fireAdmin
      .firestore()
      .collection('restaurants')
      .get()
      .then(docs => {
        let docsResult = [];
        docs.forEach(doc => {
          docsResult.push({id: doc.id, ...doc.data()});
        });
        return docsResult;
      })
      .catch(err => {
        throw err;
      });
  });
}

module.exports.findAll = findAll;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function deleteOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let options = queryFields ? queryFields : bodyFields;
  options = setRestaurant(options);
  let db = await fireAdminDB();

  let delRes = await fireAdmin
    .firestore()
    .collection('restaurants')
    .doc(options.id)
    .delete()
    .then(doc => {
      return doc;
    })
    .catch(err => {
      throw err;
    });

  let delRat = await fireAdmin
    .firestore()
    .collection('restaurants')
    .doc(options.id)
    .collection('ratings')
    .get()
    .then(docs => {
      docs.forEach(doc => {
        fireAdmin
          .firestore()
          .collection('restaurants')
          .doc(options.id)
          .collection('ratings')
          .doc(doc.id)
          .delete();
      });
      return {ratings: 'deleted'};
    })
    .catch(err => {
      throw err;
    });

  return {...delRes, ...delRat};
}

module.exports.deleteOne = deleteOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req    let newObj = new Object();
 */
async function updateOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'id',
    'name',
    'category',
    'photo',
    'city',
    'numRatings',
    'price',
    'avgRating',
  ]);

  let options = queryFields ? queryFields : bodyFields;
  options = setRestaurant(options);

  let update = JSON.parse(JSON.stringify(options));
  delete update.id;

  return fireAdminDB().then(res => {
    return fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(options.id)
      .update(update)
      .then(doc => {
        return 'Data updated';
      })
      .catch(err => {
        throw err;
      });
  });
}

module.exports.updateOne = updateOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function createOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'id',
    'name',
    'category',
    'photo',
    'city',
    'numRatings',
    'price',
    'avgRating',
  ]);

  let options = queryFields ? queryFields : bodyFields;
  options = setRestaurant(options);

  delete options.id;

  return fireAdminDB().then(res => {
    return fireAdmin
      .firestore()
      .collection('restaurants')
      .doc()
      .set(options, {merge: true})
      .then(doc => {
        return 'Data saved';
      })
      .catch(err => {
        throw err;
      });
  });
}

module.exports.createOne = createOne;

async function createOneRating(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'resId',
    'rateId',
    'rating',
    'text',
    'timestamp',
    'userId',
    'userName',
  ]);

  let options = queryFields ? queryFields : bodyFields;
  options = setRating(options);
  let update = JSON.parse(JSON.stringify(options));

  delete update.resId;
  delete update.rateId;
  const FieldValue = fireAdmin.firestore.FieldValue;
  update.timestamp = FieldValue.serverTimestamp();

  return fireAdminDB().then(res => {
    return fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(options.resId)
      .collection('ratings')
      .doc(options.rateId)
      .set(update, {merge: true})
      .then(doc => {
        return 'Data saved';
      })
      .catch(err => {
        throw err;
      });
  });
}

module.exports.createOneRating = createOneRating;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req    let newObj = new Object();
 */
async function updateOneRating(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'resId',
    'rateId',
    'rating',
    'text',
    'timestamp',
    'userId',
    'userName',
  ]);

  let options = queryFields ? queryFields : bodyFields;
  options = setRating(options);
  let update = JSON.parse(JSON.stringify(options));

  delete update.resId;
  delete update.rateId;

  const FieldValue = fireAdmin.firestore.FieldValue;
  update.timestamp = FieldValue.serverTimestamp();

  return fireAdminDB().then(res => {
    return fireAdmin
      .firestore()
      .collection('restaurants')
      .doc(options.resId)
      .collection('ratings')
      .doc(options.rateId)
      .set(update, {merge: true})
      .then(doc => {
        return 'Data updated';
      })
      .catch(err => {
        throw err;
      });
  });
}

module.exports.updateOneRating = updateOneRating;
