
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('market', function (table) {
      table.increments('market_id');
      table.string('name');
      table.string('website');
      table.string('image');
      table.tinyint('enabled').defaultTo(0);
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
      table.specificType('updated_at', 'timestamp(0)').defaultTo(knex.fn.now());
    }),
    knex("market").insert([
      {market_id: 1, name: 'BTCMarkets', website: 'https://btcmarkets.net', enabled: 1},
      {market_id: 2, name: 'Coinbase', website: 'https://coinbase.com', enabled: 1}
    ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('market')
  ]);
};