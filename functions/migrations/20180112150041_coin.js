
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coin', function (table) {
      table.increments('coin_id');
      table.string('code');
      table.string('name');
      table.string('icon');
      table.tinyint('enabled').defaultTo(0);
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
      table.specificType('updated_at', 'timestamp(0)').defaultTo(knex.fn.now());
    }),
    knex('coin').insert([
      {coin_id: 1, code: 'btc', name: 'Bitcoin', enabled: 1},
      {coin_id: 2, code: 'ltc', name: 'Litecoin', enabled: 1},
      {coin_id: 3, code: 'eth', name: 'Ethereum', enabled: 1},
      {coin_id: 4, code: 'etc', name: 'Eth Classic', enabled: 1},
      {coin_id: 5, code: 'xrp', name: 'Ripple', enabled: 1},
      {coin_id: 6, code: 'bch', name: 'BCash', enabled: 1}
    ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('coin')
  ]);
};