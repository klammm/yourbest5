
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').defaultTo('');
    table.string('last_name').defaultTo('');
    table.string('email').unique().notNullable()
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
    table.timestamps(true, true);
    })
  };

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
