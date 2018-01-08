const Client = require('coinbase').Client;

let client = new Client({
  'apiKey': 'API KEY',
  'apiSecret': 'API SECRET'
});

async function getSellPrices(currency) {

  let response = {};

  let values = [];
  values.push({code: 'eth', price: 1495.71});
  values.push({code: 'ltc', price: 395.82});
  values.push({code: 'btc', price: 23382.74});
  values.push({code: 'bch', price: 3761.76});
  values.forEach(function(item) {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

function getBuyPrice(coinCode, currency){
  return new Promise(function(resolve) {
    client.getBuyPrice({'currencyPair': `${coinCode.toUpperCase()}-${currency}`}, function(err, response) {
      if(err !== null) {
        console.error(coinCode, err);
        return resolve();
      }
      resolve({code: coinCode, price: parseFloat(response.data.amount)});
    });
  });
}

module.exports.getSellPrices = getSellPrices;