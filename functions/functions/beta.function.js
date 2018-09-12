const functions = require('firebase-functions');

module.exports = functions.https.onRequest((req, res) => {
  res.send('beta page');
});