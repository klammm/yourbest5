
exports.seed = function(knex, Promise) {
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert([
        {id: 1, team_id: 1, score: 2},
        {id: 2, team_id: 2, score: 3},
        {id: 3, team_id: 3, score: 4},

      ]);
    });
};
