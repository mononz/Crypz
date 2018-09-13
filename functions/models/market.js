let bookshelf = require('../bookshelf');

let model = bookshelf.Model.extend({
  tableName: 'market',
  idAttribute: 'market_id',
  hasTimestamps: true
}, {
  sync: function(updatedAt) {
    return model.forge().where('updated_at', '>', updatedAt).fetchAll();
  }
});

module.exports = model;