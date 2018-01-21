const Router = require('koa-router');

const router = new Router({ prefix: '/sync' });

const Coin       = require('../models/coin');
const Market     = require('../models/market');
const MarketCoin = require('../models/market_coin');

router.post('/', async ctx => {

  let tables = [];
  let promises = [];

  Object.keys(ctx.request.body).forEach(function (key) {
    let time = ctx.request.body[key];
    if (time === '0' || time === '1') {
      time = '2000-01-01T00:00:00.000Z';
    }

    let sync = null;
    switch (key) {
      case 'coin':
        sync = new Coin.sync(time);
        break;
      case 'market':
        sync = new Market.sync(time);
        break;
      case 'market_coin':
        sync = new MarketCoin.sync(time);
        break;
    }
    if (sync !== null) {
      promises.push(sync);
      tables.push(key);
    }
  });

  let result = {};
  let responses = await Promise.all(promises);
  for (let i=0; i<responses.length; i++) {
    result[tables[i]] = responses[i].toJSON();
  }

  ctx.body = {
    sync: result
  };
});

router.get('/', async ctx => {
  ctx.body = 'Nope!'
});

module.exports = router;