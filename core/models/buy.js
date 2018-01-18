let bookshelf = require('../bookshelf');

let model = bookshelf.Model.extend({
  tableName: 'buy',
  idAttribute: 'buy_id',
  hasTimestamps: false // don't want this as true
}, {
  getAll: function () {
    return model.forge().fetchAll();
  },
  create: function (marketId, json, time) {
    return model.forge({
      market_id:  marketId,
      btc:        json.hasOwnProperty('btc') ? json.btc : null,
      ltc:        json.hasOwnProperty('ltc') ? json.ltc : null,
      eth:        json.hasOwnProperty('eth') ? json.eth : null,
      etc:        json.hasOwnProperty('etc') ? json.etc : null,
      xrp:        json.hasOwnProperty('xrp') ? json.xrp : null,
      bch:        json.hasOwnProperty('bch') ? json.bch : null,
      created_at: time
    }).save();
  }
});

module.exports = model;