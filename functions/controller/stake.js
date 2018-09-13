const MarketCoin = require('../models/market_coin');

const coinbase   = require('../helper/coinbase');
const btcmarkets = require('../helper/btcmarkets');

exports.get = (req, res) => {
  res.status(400).send('Nothing here: stake')
};

exports.post = async (req, res) => {
  let data = await process(req.body);
  res.send(data);
};

exports.getById = (req, res) => {
  res.send('Nothing here: ' + req.params.id);
};

async function lookupPrice(item) {
  return new Promise(async (resolve) => {
    let lookup;
    let query = await MarketCoin.details(item.market_coin_id);
    if (query && query.hasOwnProperty('market_id') && query.hasOwnProperty('code')) {
      console.log(query.market_id);
      switch (query.market_id) {
        case 1:  // BTCMARKETS
          lookup = await btcmarkets.getPrice(query.code, 'AUD');
          break;
        case 2:  // COINBASE
          lookup = await coinbase.getPrice(query.code, 'AUD');
          break;
      }
    } else {
      console.error('No lookup', JSON.stringify(item));
    }
    item['price'] = lookup  ? lookup.price : -1;
    resolve(item);
  });
}

async function process(body) {
  return new Promise(async (resolve) => {
    let promises = [];
    body.forEach((item) => {
      console.log('lookup', item);
      promises.push(lookupPrice(item))
    });
    let responses = await Promise.all(promises);
    resolve(responses);
  });
}