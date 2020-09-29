const checkReqErrors = require('@/includes/status').checkReqErrors;
const user = require('@/includes/firebase/user');

export default (req, res) => {
  if (req.method === 'GET') {
    user
      .status()
      .then(value => {
        checkReqErrors({result: `Connected: ${value}`}, res);
      })
      .catch(err => {
        checkReqErrors({error: 20, err: err}, res);
      });
  }
};
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
