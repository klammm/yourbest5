
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert([
        {id: 1, player_id: 1, score: 2},
        {id: 2, player_id: 2, score: 3},
        {id: 3, player_id: 3, score: 4},

      ]);
    });
};
