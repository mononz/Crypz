const Router = require('koa-router');
const router = new Router({ prefix: '/btcmarkets' });

const coinbaseAPI   = require('./helper/coinbase');
const btcmarketsAPI = require('./helper/btcmarkets');
const utils         = require('./helper/utils');

let coins = [];
coins.push({
  name: 'Bitcoin',
  code: 'btc'
});
coins.push({
  name: 'Ethereum',
  code: 'eth'
});
coins.push({
  name: 'Litecoin',
  code: 'ltc'
});
coins.push({
  name: 'BCash',
  code: 'bch'
});

router.get('/', async ctx => {

  let builder = {
    config: {
      stake:    2000,
      currency: 'AUD',
      sellFee:  0.5
    },
    markets: [],
    coins: coins
  };

  // pull out query params to modify config
  let minimal = ctx.query.hasOwnProperty('minimal') && ctx.query.minimal === 'true';
  if (ctx.query.hasOwnProperty('stake')) {
    builder.config.stake = parseFloat(ctx.query.stake);
  }
  if (ctx.query.hasOwnProperty('sellFee')) {
    builder.config.sellFee = parseFloat(ctx.query.sellFee);
  }
  if (ctx.query.hasOwnProperty('currency')) {
    builder.config.currency = ctx.query.currency;
  }

  // pull buy and sell data
  let buys = await coinbaseAPI.getBuyPrices(builder.config.currency);
  let sells = await btcmarketsAPI.getSellPrices(builder.config.currency);

  // coinbase
  let coinbase = {name: 'Coinbase', buyFee: 3.84, sendFee: 0.0163, trading: {}};
  coins.forEach(function (coin) {
    if (buys.hasOwnProperty(coin.code) && sells.hasOwnProperty(coin.code)) {
      let obj = calculate(coinbase, buys[coin.code], sells[coin.code], builder.config, minimal);
      if (obj.hasOwnProperty('err')) return console.err(coin.code, obj.err);
      //print(obj);
      coinbase.trading[coin.code] = obj;
    }
  });
  builder.markets.push(coinbase);

  ctx.body = builder;
});

function calculate(market, buyPrice, sellPrice, config, minimal) {

  if (market.buyFee === 0) {
    return {err: 'Buy fee cannot be 0'};
  }
  if (market.sendFee === 0) {
    return {err: 'Send fee cannot be 0'};
  }
  if (market.sellFee === 0) {
    return {err: 'Sell fee cannot be 0'};
  }

  let initialRatio = (sellPrice - buyPrice) / buyPrice * 100;
  let purchaseFee = config.stake * (market.buyFee / 100);
  let realStake = config.stake - purchaseFee;
  let coinBuy = realStake / buyPrice;
  let coinSent = coinBuy * (1 - market.sendFee / 100);
  let coinSold = coinSent * sellPrice;
  let sellFee = coinSold * (config.sellFee / 100);
  let banked = coinSold - sellFee;
  let netGain = (banked - config.stake);
  let percentGain = netGain / config.stake * 100;
  let movement3hr = 0.00;

  if (minimal) {
    return {
      buyPrice:     buyPrice,
      sellPrice:    sellPrice,
      buySellRatio: utils.round(initialRatio, 2),
      netGainRatio: utils.round(percentGain, 2),
    };
  }

  return {
    buyPrice:     buyPrice,
    sellPrice:    sellPrice,
    buySellRatio: utils.round(initialRatio, 2),
    buyFee:       utils.round(purchaseFee, 2),
    buying:       realStake,
    purchased:    utils.round(coinBuy, 5),
    transferred:  utils.round(coinSent, 5),
    soldPrice:    utils.round(coinSold, 2),
    sellFee:      utils.round(sellFee, 2),
    banked:       utils.round(banked, 2),
    netGain:      utils.round(netGain, 2),
    netGainRatio: utils.round(percentGain, 2),
    movement3hr:  utils.round(movement3hr, 2) // should look at the last 3hr movement to reaffirm buy
  };
}

function print(obj) {
  console.log('Buy price:   ', obj.buyPrice + ' AUD');
  console.log('Sell price:  ', obj.sellPrice + ' AUD (' + obj.buySellRatio + '%)');
  console.log('Buy Fee:     ', obj.buyFee + ' AUD');
  console.log('Real Stake:  ', obj.buying + ' AUD');
  console.log('Purchased:   ', obj.purchased);
  console.log('Transferred: ', obj.transferred);
  console.log('Sold for:    ', obj.sellPrice + ' AUD');
  console.log('Sell Fee:    ', obj.sellFee + ' AUD');
  console.log('Banked:      ', obj.banked + ' AUD');
  console.log('Net Gain:    ', obj.netGain + ' AUD (' + obj.netGainRatio + '%)');
  console.log('Movement3hr: ', obj.movement3hr);
  console.log('--------------------------------');
}

module.exports = router;