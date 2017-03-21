
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('players_teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('players_teams').insert([
        {
          id: 1,
          player_id: 1,
          team_id: 1,
        },
        {
          id: 2,
          player_id: 8,
          team_id: 1,
        },
        {
          id: 3,
          player_id: 7,
          team_id: 1,
        },
        {
          id: 4,
          player_id: 5,
          team_id: 1,
        },
        {
          id: 5,
          player_id: 9,
          team_id: 1,
        },
        {
          id: 6,
          player_id: 1,
          team_id: 2,
        },
        {
          id: 7,
          player_id: 2,
          team_id: 2,
        },
        {
          id: 8,
          player_id: 3,
          team_id: 2,
        },
        {
          id: 9,
          player_id: 10,
          team_id: 2,
        },
        {
          id: 10,
          player_id: 5,
          team_id: 2,
        }
      ]);
    });
};
