const checkReqErrors = require('@/includes/status').checkReqErrors;
const data = require('@/includes/firebase/data');

export default (req, res) => {
  if (req.method === 'POST') {
    data
      .createOneRating(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 3, err: err}, res);
      });
  } else if (req.method === 'PATCH') {
    data
      .updateOneRating(req)
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
