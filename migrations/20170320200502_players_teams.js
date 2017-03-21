
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players_teams', (table) => {
    table.increments('id').primary();
    table.integer('player_id').notNullable().references('id').inTable('players').onDelete('CASCADE');
    table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players_teams')
};
