const BTCMarkets = require('btc-markets').default;
const functions  = require('firebase-functions');

const keys = functions.config().keys.btcmarkets;

const client = new BTCMarkets(keys.key, keys.secret);

async function getPrices(currency) {

  let response = {};

  let promises = [];
  promises.push(getPrice('btc', currency));
  promises.push(getPrice('ltc', currency));
  promises.push(getPrice('eth', currency));
  promises.push(getPrice('etc', currency));
  promises.push(getPrice('xrp', currency));
  promises.push(getPrice('bch', currency));

  let values = await Promise.all(promises);
  values.forEach(item => {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

async function getPrice(coinCode, currency) {
  return client.getTick(coinCode.toUpperCase(), currency)
    .then(response => {
      console.log(response);
      return {
        code: coinCode,
        price: parseFloat(response.bestBid)
      };
    })
    .catch(() => {
      return null;
    });
}

module.exports.getPrices = getPrices;
module.exports.getPrice = getPrice;