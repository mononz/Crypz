
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('setting', function (table) {
      table.increments('setting_id');
      table.string('property');
      table.string('value');
      table.specificType('created_at', 'timestamp(0)').defaultTo(knex.fn.now());
      table.specificType('updated_at', 'timestamp(0)').defaultTo(knex.fn.now());
    }),
    knex('setting').insert([
      {setting_id: 1, property: 'android.version', value: '1'},
      {setting_id: 2, property: 'ios.version', value: '1'},
      {setting_id: 3, property: 'sync.frequency', value: '300'},
    ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('setting')
  ]);
};