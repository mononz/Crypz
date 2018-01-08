const Client = require('coinbase').Client;

let client = new Client({
  'apiKey': process.env.coinbaseApiKey,
  'apiSecret': process.env.coinbaseApiSecret
});

async function getBuyPrices(currency) {

  let response = {};
  let promises = [];

  promises.push(getBuyPrice('btc', currency));
  promises.push(getBuyPrice('ltc', currency));
  promises.push(getBuyPrice('eth', currency));
  promises.push(getBuyPrice('bch', currency));

  let values = await Promise.all(promises);
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

module.exports.getBuyPrices = getBuyPrices;