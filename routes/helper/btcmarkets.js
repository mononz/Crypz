let BTCMarkets = require('btc-markets');

let client = new BTCMarkets(process.env.btcApiKey, process.env.btcApiSecret);

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
  values.forEach(function(item) {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

function getPrice(coinCode, currency){
  return new Promise(function(resolve) {
    client.getTick(coinCode.toUpperCase(), currency, function(err, response) {
      if(err !== null) {
        console.error(coinCode, err);
        return resolve();
      }
      //console.log('bid ' + response.bestBid + ' ask ' + response.bestAsk + ' last price ' + response.lastPrice);
      resolve({code: coinCode, price: parseFloat(response.bestBid)});
    });
  });
}

module.exports.getPrices = getPrices;