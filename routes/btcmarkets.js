const Router = require('koa-router');
const router = new Router({ prefix: '/btcmarkets' });

const coinbaseAPI   = require('./helper/coinbase');
const btcmarketsAPI = require('./helper/btcmarkets');
const utils         = require('./helper/utils');

let cryptos = [];
cryptos.push({
  name: 'Bitcoin',
  code: 'btc'
});
cryptos.push({
  name: 'Ethereum',
  code: 'eth'
});
cryptos.push({
  name: 'Litecoin',
  code: 'ltc'
});
cryptos.push({
  name: 'BCash',
  code: 'bch'
});

router.get('/', async ctx => {

  let config = {
    stake:    2000,
    currency: 'AUD'
  };

  let coinbase = {
    name:   'Coinbase',
    buyFee:  3.84,  // on orders over $200
    sendFee: 0.0163,
    sellFee: 0.5,
    trading: {}
  };

  function calculate(market, buyPrice, sellPrice, log) {

    function print(obj) {

      if (obj !== null && obj.hasOwnProperty('err')) {
        console.error('Error', obj.err);
        return;
      }

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
    let sellFee = coinSold * (market.sellFee / 100);
    let banked = coinSold - sellFee;
    let netGain = (banked - config.stake);
    let percentGain = netGain / config.stake * 100;
    let movement3hr = 0.00;

    let result = {
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

    if (log) {
      print(result);
    }
    return result;
  }

  if (ctx.query.hasOwnProperty('stake')) {
    config.stake = parseFloat(ctx.query.stake);
  }

  let buys = await coinbaseAPI.getBuyPrices(config.currency);
  let sells = await btcmarketsAPI.getSellPrices(config.currency);

  cryptos.forEach(function (coin) {
    if (buys.hasOwnProperty(coin.code) && sells.hasOwnProperty(coin.code)) {
      let obj = calculate(coinbase, buys[coin.code], sells[coin.code], false);
      if (!obj.hasOwnProperty('err')) {
        coinbase.trading[coin.code] = obj;
      }
    }
  });

  let markets = [];
  markets.push(coinbase);

  ctx.body = {
    config: config,
    markets: markets,
    cryptos: cryptos,
    buyCoin: buys
  };
});

module.exports = router;