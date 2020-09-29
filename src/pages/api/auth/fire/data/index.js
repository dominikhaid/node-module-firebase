const checkReqErrors = require('@/includes/status').checkReqErrors;
const data = require('@/includes/firebase/data');

export default (req, res) => {
  if (req.method === 'GET') {
    Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0
      ? data
          .findOne(req)
          .then(value => {
            checkReqErrors({result: value}, res);
          })
          .catch(err => {
            checkReqErrors({error: 1, err: err}, res);
          })
      : data
          .findAll()
          .then(value => {
            checkReqErrors({result: value}, res);
          })
          .catch(err => {
            checkReqErrors({error: 1, err: err}, res);
          });
  } else if (req.method === 'POST') {
    data
      .createOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 3, err: err}, res);
      });
  } else if (req.method === 'DELETE') {
    data
      .deleteOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 2, err: err}, res);
      });
  } else if (req.method === 'PATCH') {
    data
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
