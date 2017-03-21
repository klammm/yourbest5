
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image');
    table.integer('ppg').notNullable();
    table.integer('apg').notNullable();
    table.integer('fgp').notNullable();
    table.integer('ftp').notNullable();
    table.integer('rpg').notNullable();
    table.integer('bpg').notNullable();
    table.integer('spg').notNullable();
    table.integer('tpg').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players')
};
