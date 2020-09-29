const checkReqErrors = require('@/includes/status').checkReqErrors;
const user = require('@/includes/firebase/user');

export default (req, res) => {
  if (req.method === 'GET') {
    console.log('GET PARAMS');
    user
      .searchOne(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 11, err: err}, res);
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
