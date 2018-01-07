const Router = require('koa-router');
const router = new Router({ prefix: '/' });

router.get('robots.txt', ctx => {
  ctx.type = 'text/plain; charset=utf-8';
  ctx.body = "User-agent: *\nDisallow: /";
});

router.get('/', ctx => {
  ctx.body = 'hi';
});

let stake = 2000;
let constants = {
  stake: 2000,
  buy:   3.837,  // on orders over $200
  send:  0.0163,
  sell:  0.5
};

console.log('Stake:', stake);
console.log('Fees:', constants);

viability('Litecoin: LTC', 359.87, 395.82);
viability('Ethereum: ETH', 1356.76, 1495.71);
viability('Bitcoin: BTC', 21081.43, 23382.74);
viability('Bitcoin Cash: BCH', 3344.78, 3761.76);

// real transaction
viability('Litecoin TEST: 05/01/18', 312.53, 360.15);

function viability(name, buyPrice, sellPrice) {

  if (constants.buy === 0) {
    console.error(name, 'Buy fee cannot be 0');
    return
  }
  if (constants.send === 0) {
    console.error(name, 'Send fee cannot be 0');
    return
  }
  if (constants.sell === 0) {
    console.error(name, 'Sell fee cannot be 0');
    return
  }

  console.log('--------------------------------');
  console.log(name);
  console.log('--------------------------------');

  console.log('Buy price:   ', buyPrice + ' AUD');
  let initialRatio = (sellPrice - buyPrice) / buyPrice * 100;
  console.log('Sell price:  ', sellPrice + ' AUD (' + initialRatio.toFixed(2) + '%)');

  let purchaseFee = stake * (constants.buy / 100);
  console.log('Buy Fee:     ', purchaseFee.toFixed(2) + ' AUD');

  let realStake = stake - purchaseFee;
  console.log('Real Stake:  ', realStake + ' AUD');

  let coinBuy = realStake / buyPrice;
  console.log('Purchased:   ', coinBuy.toFixed(5));

  let coinSent = coinBuy * (1 - constants.send / 100);
  console.log('Transferred: ', coinSent.toFixed(5));

  let coinSold = coinSent * sellPrice;
  console.log('Sold for:    ', coinSold.toFixed(2) + ' AUD');

  let sellFee = coinSold * (constants.sell / 100);
  console.log('Sell Fee:    ', sellFee.toFixed(2) + ' AUD');

  let audReceived = coinSold - sellFee;
  console.log('Banked:      ', audReceived.toFixed(2) + ' AUD');

  let netGain = (audReceived - stake);
  let percentGain = netGain / stake * 100;
  console.log('Net Gain:    ', netGain.toFixed(2) + ' AUD (' + percentGain.toFixed(2) + '%)');

  return percentGain.toFixed(2);
}

module.exports = router;