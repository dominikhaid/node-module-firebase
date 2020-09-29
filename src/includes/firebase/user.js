const fireAdminDB = require('./db').fireAdminDB;
const fireAdmin = require('firebase-admin');

const setUser = ({
  id = null,
  email = null,
  phoneNumber = undefined,
  emailVerified = false,
  displayName = null,
  photoURL = undefined,
  disabled = false,
  customClaims = null,
}) => {
  return id
    ? {
        uid: id,
        email: decodeURIComponent(email),
        phoneNumber: decodeURIComponent(phoneNumber),
        emailVerified: Boolean(Number(emailVerified)),
        displayName: decodeURIComponent(displayName),
        photoURL: decodeURIComponent(photoURL),
        disabled: Boolean(Number(disabled)),
        customClaims: decodeURIComponent(customClaims),
      }
    : {
        email: decodeURIComponent(email),
        phoneNumber: decodeURIComponent(phoneNumber),
        emailVerified: Boolean(Number(emailVerified)),
        displayName: decodeURIComponent(displayName),
        photoURL: decodeURIComponent(photoURL),
        disabled: Boolean(Number(disabled)),
        customClaims: decodeURIComponent(customClaims),
      };
};

const getUser = ({
  uid = null,
  email = null,
  phoneNumber = undefined,
  emailVerified = false,
  displayName = null,
  photoURL = undefined,
  disabled = false,
  customClaims = null,
  exp = null,
  provider = null,
}) => {
  return {
    uid: uid,
    email: email,
    phoneNumber: phoneNumber,
    emailVerified: emailVerified,
    displayName: displayName,
    photoURL: photoURL,
    disabled: disabled,
    customClaims: customClaims,
    exp: exp,
    provider: provider,
  };
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
async function fireAdminSetRole(req) {
  let {params: params} = reqToFirebase(req);
  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .setCustomUserClaims(params.uid, params.customClaims)
      .then(() => {
        if (
          params.customClaims.admin === true ||
          params.customClaims.admin === 'true'
        )
          return {msg: 'Benutzer Rechte geändert Admin'};
        return {msg: 'Benutzer Rechte geändert User'};
      })
      .catch(error => {
        throw error;
      });
  });
}

module.exports.fireAdminSetRole = fireAdminSetRole;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function findOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let options = queryFields
    ? setUser(queryFields)
    : bodyFields
    ? setUser(bodyFields)
    : null;

  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .getUser(options.uid)
      .then(userRecord => {
        return userRecord;
      })
      .catch(error => {
        throw error;
      });
  });
}

module.exports.findOne = findOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Firbase Instance'} fireBase
 * @param {'Express request'} req
 */
async function searchOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let options = queryFields
    ? setUser(queryFields)
    : bodyFields
    ? setUser(bodyFields)
    : null;

  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .getUserByEmail(options.email)
      .then(function (userRecord) {
        return userRecord;
      })
      .catch(function (error) {
        throw error;
      });
  });
}

module.exports.searchOne = searchOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function createOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'email',
    'phoneNumber',
    'emailVerified',
    'displayName',
    'photoURL',
    'disabled',
    'customClaims',
  ]);

  let options = queryFields
    ? setUser(queryFields)
    : bodyFields
    ? setUser(bodyFields)
    : null;

  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .createUser(options)
      .then(function (userRecord) {
        return userRecord;
      })
      .catch(function (error) {
        throw error;
      });
  });
}

module.exports.createOne = createOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function updateOne(req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'id',
    'email',
    'phoneNumber',
    'emailVerified',
    'displayName',
    'photoURL',
    'disabled',
    'customClaims',
  ]);

  let options = queryFields
    ? setUser(queryFields)
    : bodyFields
    ? setUser(bodyFields)
    : null;

  uids = options.uid.split(',');

  delete options.uid;

  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .updateUser(uids[0], options)
      .then(function (userRecord) {
        return getUser(userRecord);
      })
      .catch(function (error) {
        throw error;
      });
  });
}

module.exports.updateOne = updateOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'Express request'} req
 */
async function deleteOne(req) {
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let options = queryFields
    ? setUser(queryFields)
    : bodyFields
    ? setUser(bodyFields)
    : null;

  uids = options.uid.split(',');

  return fireAdminDB().then(res => {
    if (Array.isArray(uids) && uids.length > 1) {
      return fireAdminDeletUsers(fireAdmin, uids);
    } else {
      return fireAdmin
        .auth()
        .deleteUser(uids[0])
        .then(function () {
          return {msg: 'Benutzer gelöscht'};
        })
        .catch(function (error) {
          throw error;
        });
    }
  });
}

module.exports.deleteOne = deleteOne;

/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 * @param {'array|uids'} uids
 */
async function delteMany(uids) {
  return fireAdminDB().then(res => {
    return fireAdmin
      .auth()
      .deleteUsers(uids)
      .then(function (e) {
        return e;
      })
      .catch(function (error) {
        throw error;
      });
  });
}

module.exports.delteMany = delteMany;
/**
 *
 * @param {'Firebase Admin Instance'} fireAdmin
 */
async function findAll() {
  if (!fireAdmin)
    throw {
      error: {code: 'internal', msg: 'Inernal error please try Again later'},
    };
  let userList = [];

  async function listAllUsers(nextPageToken) {
    return fireAdmin
      .auth()
      .listUsers(1000, nextPageToken)
      .then(function (listUsersResult) {
        listUsersResult.users.forEach(function (userRecord) {
          userList.push(getUser(userRecord));
        });
        if (listUsersResult.pageToken) {
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .finally(() => {
        return userList;
      })
      .catch(function (error) {
        throw error;
      });
  }
  await fireAdminDB().then(await listAllUsers());
  return userList;
}

module.exports.findAll = findAll;
