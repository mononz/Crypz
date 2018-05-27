
exports.up = function(knex, Promise) {
  return knex.schema.table('coin', function(table) {
    table.string('color');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('coin', function(table) {
    table.dropColumn('color');
  });
};