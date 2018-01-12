const Router = require('koa-router');
const router = new Router({ prefix: '/prices' });
const formatCurrency = require('format-currency');

const coinbaseAPI   = require('./helper/coinbase');
const btcmarketsAPI = require('./helper/btcmarkets');
const slack         = require('./helper/slack');

const Buy = require('../models/buy');

let currency = 'AUD';

router.post('/', async ctx => {

  let time = new Date(); // ensures dates always go in with same time

  let coinbase   = await coinbaseAPI.getPrices(currency);
  let btcmarkets = await btcmarketsAPI.getPrices(currency);

  let response = {coinbase: coinbase, btcmarkets: btcmarkets};

  if (ctx.request.header.hasOwnProperty('save') && ctx.request.header.save === 'qwertyuiop') {
    // ToDo Probably should be hardcoding market ids here
    await Buy.create(1, coinbase, time);
    await Buy.create(2, btcmarkets, time);
    response['saved'] = true
  }

  if (ctx.request.header.hasOwnProperty('slack') && ctx.request.header.slack === 'qwertyuiop') {
    let message = [];
    Object.keys(btcmarkets).forEach(function (key) {
      message.push('*' + key + '* ' + formatCurrency(btcmarkets[key]));
    });
    await slack.pushMessage(message.join('    '));
  }

  ctx.body = response;
});

module.exports = router;