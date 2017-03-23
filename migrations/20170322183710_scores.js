
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary();
    table.integer('player_id').notNullable().references('id').inTable('players').onDelete('CASCADE');
    table.integer('score').notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
