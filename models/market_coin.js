let bookshelf = require('../bookshelf');

let model = bookshelf.Model.extend({
  tableName: 'market_coin',
  idAttribute: 'market_coin_id',
  hasTimestamps: true
}, {
  sync: function(updatedAt) {
    return model.forge().where('updated_at', '>', updatedAt).fetchAll();
  },
  details: function (marketCoinId) {
    return bookshelf.knex('market_coin')
      .innerJoin('market', 'market.market_id', 'market_coin.market_id')
      .innerJoin('coin', 'coin.coin_id', 'market_coin.coin_id')
      .where('market_coin_id', marketCoinId)
      .first();
  }
});

module.exports = model;