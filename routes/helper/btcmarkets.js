async function getSellPrices(currency) {

  let response = {};

  let values = [];
  values.push({code: 'eth', price: 1500});
  values.push({code: 'ltc', price: 500});
  values.push({code: 'btc', price: 20000});
  values.push({code: 'bch', price: 5000});
  values.forEach(function(item) {
    if (item) {
      response[item.code] = item.price;
    }
  });
  return response;
}

module.exports.getSellPrices = getSellPrices;