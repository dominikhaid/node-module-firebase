const checkReqErrors = require('@/includes/status').checkReqErrors;
const user = require('@/includes/firebase/user');

export default (req, res) => {
  if (req.method === 'GET') {
    user
      .findOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 1, err: err}, res);
      });
  } else if (req.method === 'DELETE') {
    user
      .deleteOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 2, err: err}, res);
      });
  } else if (req.method === 'POST') {
    user
      .createOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 3, err: err}, res);
      });
  } else if (req.method === 'PATCH') {
    user
      .updateOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 4, err: err}, res);
      });
  } else {
    checkReqErrors({error: 'No End Point to this Request'}, res);
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
