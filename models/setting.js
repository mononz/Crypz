let bookshelf = require('../bookshelf');

let model = bookshelf.Model.extend({
  tableName: 'setting',
  idAttribute: 'setting_id',
  hasTimestamps: true
}, {
  sync: function(updatedAt) {
    return model.forge().where('updated_at', '>', updatedAt).fetchAll();
  }
});

module.exports = model;