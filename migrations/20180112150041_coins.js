
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coins', function (table) {
      table.increments('coins_id');
      table.string('code');
      table.string('name');
      table.string('icon');
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
      table.specificType('updated_at', 'timestamp(0)').defaultTo(knex.fn.now());
    }),
    knex("coins").insert([
      {coins_id: '1', code: 'btc', name: 'Bitcoin'},
      {coins_id: '2', code: 'eth', name: 'Ethereum'},
      {coins_id: '3', code: 'ltc', name: 'Litecoin'},
      {coins_id: '4', code: 'bch', name: 'BCash'},
      {coins_id: '5', code: 'xrp', name: 'Ripple'},
    ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('coins')
  ]);
};