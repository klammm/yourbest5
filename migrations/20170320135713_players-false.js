
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('players', (table) => {
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
    }),
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').defaultTo('');
      table.string('last_name').defaultTo('');
      table.string('email').unique().notNullable()
      table.specificType('hashed_password', 'char(60)').notNullable();
      table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('players_teams', (table) => {
      table.increments('id').primary();
      table.integer('player_id').notNullable().references('id').inTable('players').onDelete('CASCADE');
      table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('players_teams'),
    knex.schema.dropTableIfExists('players'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('teams')
  ])
};
