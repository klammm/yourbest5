
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary();
    table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
    table.integer('score').notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
