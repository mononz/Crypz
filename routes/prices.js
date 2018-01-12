const Router = require('koa-router');
const router = new Router({ prefix: '/prices' });

const coinbaseAPI   = require('./helper/coinbase');
const btcmarketsAPI = require('./helper/btcmarkets');

const Buy = require('../models/buy');

let currency = 'AUD';

router.get('/', async ctx => {

  let time = new Date(); // ensures dates always go in with same time

  let coinbase   = await coinbaseAPI.getPrices(currency);
  let btcmarkets = await btcmarketsAPI.getPrices(currency);

  let response = {coinbase: coinbase, btcmarkets: btcmarkets};

  if (ctx.request.header.hasOwnProperty('save') && ctx.request.header.save === 'qwertyuiop') {
    // ToDo Probably should be hardcoding market ids here
    await Buy.create(1, coinbase.btc, coinbase.eth, coinbase.ltc, coinbase.bch, coinbase.xrp, time);
    await Buy.create(2, btcmarkets.btc, btcmarkets.eth, btcmarkets.ltc, btcmarkets.bch, btcmarkets.xrp, time);
    response['saved'] = true
  }

  ctx.body = response;
});

module.exports = router;