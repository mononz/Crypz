const Client = require('coinbase').Client;

let client = new Client({
  'apiKey': process.env.coinbaseApiKey,
  'apiSecret': process.env.coinbaseApiSecret
});

async function getPrices(currency) {

  let response = {};
  let promises = [];

  promises.push(getPrice('btc', currency));
  promises.push(getPrice('ltc', currency));
  promises.push(getPrice('eth', currency));
  promises.push(getPrice('bch', currency));

  let values = await Promise.all(promises);
  values.forEach(function(item) {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

function getPrice(coinCode, currency){
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

module.exports.getPrices = getPrices;
module.exports.getPrice = getPrice;