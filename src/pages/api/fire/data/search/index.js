const checkReqErrors = require('@/includes/status').checkReqErrors;
const data = require('@/includes/firebase/data');

export default (req, res) => {
  if (req.method === 'GET') {
    data
      .search(req)
      .then(value => {
        checkReqErrors({result: value}, res);
      })
      .catch(err => {
        checkReqErrors({error: 11, err: err}, res);
      });
  }
};
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
