const Router = require('koa-router');
const router = new Router({ prefix: '/' });

router.get('robots.txt', ctx => {
  ctx.type = 'text/plain; charset=utf-8';
  ctx.body = "User-agent: *\nDisallow: /";
});

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

router.get('btcmarkets', async ctx => {

  let config = {
    stake:   2000
  };

  let coinbase = {
    name:   'Coinbase',
    buyFee:  3.84,  // on orders over $200
    sendFee: 0.0163,
    sellFee: 0.5,
    trading: {}
  };

  function calculate(market, buyPrice, sellPrice, log) {

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
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      buySellRatio: round(initialRatio, 2),
      buyFee: round(purchaseFee, 2),
      buying: realStake,
      purchased: round(coinBuy, 5),
      transferred: round(coinSent, 5),
      soldPrice: round(coinSold, 2),
      sellFee: round(sellFee, 2),
      banked: round(banked, 2),
      netGain: round(netGain, 2),
      netGainRatio: round(percentGain, 2),
      movement3hr: round(movement3hr, 2) // should look at the last 3hr movement to reaffirm buy
    };

    if (log) {
      print(result);
    }
    return result;
  }

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

  if (ctx.query.hasOwnProperty('stake')) {
    config.stake = parseFloat(ctx.query.stake);
  }

  // bitcoin
  let btc = calculate(coinbase, 21081.43, 23382.74, false);
  if (!btc.hasOwnProperty('err')) {
    coinbase.trading['btc'] = btc;
  }
  // ethereum
  let eth = calculate(coinbase, 1356.76, 1495.71, false);
  if (!eth.hasOwnProperty('err')) {
    coinbase.trading['eth'] = eth;
  }
  // litecoin
  let ltc = calculate(coinbase, 359.87, 395.82, false);
  if (!ltc.hasOwnProperty('err')) {
    coinbase.trading['ltc'] = ltc;
  }
  //bcash
  let bch = calculate(coinbase, 3344.78, 3761.76, false);
  if (!bch.hasOwnProperty('err')) {
    coinbase.trading['bch'] = bch;
  }
  // real test transaction
  // let tst = calculate(coinbase, 312.53, 360.15, false);
  // if (!tst.hasOwnProperty('err')) {
  //   coinbase.trading['test'] = tst;
  // }

  //print('TST: 05/01/18', tst);

  let markets = [];
  markets.push(coinbase);

  ctx.body = {
    config: config,
    markets: markets,
    cryptos: cryptos
  };
});

router.get('/', async ctx => {
  ctx.body = 'hi';
});

function round(value, dp) {
  let thousands = Math.pow(10, dp);
  return Math.round(value * thousands) / thousands;
}

module.exports = router;