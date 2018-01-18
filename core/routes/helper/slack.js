const request = require('request-promise');

exports.pushMessage = function(message) {
  let options = {
    method: 'POST',
    uri: process.env.slackWebHookUrl,
    json: {
      text: message
    }
  };

  return new Promise((resolve,reject) => {
    request(options)
      .then(function (result) {
        resolve(result);
      })
      .catch(function (err) {
        console.error('slack', err);
        reject(err);
      });
  });
};