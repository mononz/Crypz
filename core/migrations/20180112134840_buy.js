
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('buy', function (table) {
      table.increments('buy_id');
      table.string('market_id');
      table.double('btc');
      table.double('ltc');
      table.double('eth');
      table.double('etc');
      table.double('xrp');
      table.double('bch');
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('buy')
  ]);
};