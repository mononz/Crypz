
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('market_coin', function (table) {
      table.increments('market_coin_id');
      table.integer('market_id');
      table.integer('coin_id');
      table.tinyint('enabled').defaultTo(0);
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
      table.specificType('updated_at', 'timestamp(0)').defaultTo(knex.fn.now());
    }),
    knex('market_coin').insert([
      {market_id: 1, coin_id: 1, enabled: 1},
      {market_id: 1, coin_id: 2, enabled: 1},
      {market_id: 1, coin_id: 3, enabled: 1},
      {market_id: 1, coin_id: 4, enabled: 1},
      {market_id: 1, coin_id: 5, enabled: 1},
      {market_id: 1, coin_id: 6, enabled: 1},
      {market_id: 2, coin_id: 1, enabled: 1},
      {market_id: 2, coin_id: 2, enabled: 1},
      {market_id: 2, coin_id: 3, enabled: 1},
      {market_id: 2, coin_id: 6, enabled: 1}
    ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('market_coin')
  ]);
};