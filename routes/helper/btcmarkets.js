let BTCMarkets = require('btc-markets');

let client = new BTCMarkets(process.env.btcApiKey, process.env.btcApiSecret);

async function getSellPrices(currency) {

  let response = {};
  let promises = [];

  promises.push(getSellPrice('btc', currency));
  promises.push(getSellPrice('ltc', currency));
  promises.push(getSellPrice('eth', currency));
  promises.push(getSellPrice('bch', currency));

  let values = await Promise.all(promises);
  values.forEach(function(item) {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

function getSellPrice(coinCode, currency){
  return new Promise(function(resolve) {
    client.getTick(coinCode.toUpperCase(), currency, function(err, response) {
      if(err !== null) {
        console.error(coinCode, err);
        return resolve();
      }
      //console.log('bid ' + response.bestBid + ' ask ' + response.bestAsk + ' last price ' + response.lastPrice);
      resolve({code: coinCode, price: parseFloat(response.bestAsk)});
    });
  });
}

module.exports.getSellPrices = getSellPrices;