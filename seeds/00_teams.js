
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {
          id: 1,
          name: "Klam",
        },
        {
          id: 2,
          name: "Deep",
        },
        {
          id: 3,
          name: 'Foxworthington',
        },
        {
          id: 4,
          name: "Beefwellington",
        },
        {
          id: 5,
          name: "Totoro",
        },
        {
          id: 6,
          name: "Gandalf",
        },
        {
          id: 7,
          name: "Waldo",
        }
      ]);
    }).then( () => {
          return knex.raw("SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));")
        });
};
