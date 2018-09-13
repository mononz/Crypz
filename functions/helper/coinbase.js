const Client = require('coinbase').Client;
const functions  = require('firebase-functions');

const keys = functions.config().keys.coinbase;

let client = new Client({
  'apiKey': keys.key,
  'apiSecret': keys.secret
});

async function getPrices(currency) {

  let response = {};
  let promises = [];

  promises.push(getPrice('btc', currency));
  promises.push(getPrice('ltc', currency));
  promises.push(getPrice('eth', currency));
  promises.push(getPrice('bch', currency));

  let values = await Promise.all(promises);
  values.forEach(item => {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

function getPrice(coinCode, currency){
  return new Promise(resolve => {
    client.getBuyPrice({'currencyPair': `${coinCode.toUpperCase()}-${currency}`}, (err, response) => {
      if (err) {
        console.error(coinCode, err);
        return resolve();
      }
      resolve({code: coinCode, price: parseFloat(response.data.amount)});
    });
  });
}

module.exports.getPrices = getPrices;
module.exports.getPrice = getPrice;