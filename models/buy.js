let bookshelf = require('../bookshelf');

let model = bookshelf.Model.extend({
  tableName: 'buy',
  idAttribute: 'buy_id',
  hasTimestamps: false // don't want this as true
}, {
  getAll: function () {
    return model.forge().fetchAll();
  },
  create: function (marketId, btc, eth, ltc, bch, xrp, time) {
    return model.forge({
      market_id:  marketId,
      btc:        btc ? btc : null,
      eth:        eth ? eth : null,
      ltc:        ltc ? ltc : null,
      bch:        bch ? bch : null,
      xrp:        xrp ? xrp : null,
      created_at: time
    }).save();
  }
});

module.exports = model;