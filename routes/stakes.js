const Router = require('koa-router');
const router = new Router({ prefix: '/stakes' });

const MarketCoin = require('../models/market_coin');

const coinbaseAPI   = require('./helper/coinbase');
const btcmarketsAPI = require('./helper/btcmarkets');

router.post('/', async ctx => {
  ctx.body = await process(ctx.request.body);
});

async function lookupPrice(item) {
  return new Promise(async (resolve) => {
    let lookup;
    let query = await MarketCoin.details(item.market_coin_id);
    if (query && query.hasOwnProperty('market_id') && query.hasOwnProperty('code')) {
      switch (query.market_id) {
        case 1:  // BTCMARKETS
          lookup = await btcmarketsAPI.getPrice(query.code, 'AUD');
          break;
        case 2:  // COINBASE
          lookup = await coinbaseAPI.getPrice(query.code, 'AUD');
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
      promises.push(lookupPrice(item))
    });
    let responses = await Promise.all(promises);
    resolve(responses);
  });

  // for (let i=0; i<responses.length; i++) {
  //   data[tables[i]] = responses[i].toJSON();
  // }
}



module.exports = router;