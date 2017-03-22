const data = [{
  id: 1,
  first_name: 'Kevin',
  last_name: 'KlamJohnson',
  email: 'KlamJohnson@gmail.com',
  hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
  team_id: 1,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}];
// {
//   id: 2,
//   first_name: 'KayDaddy',
//   last_name: 'Zheng',
//   email: 'KayDaddy@gmail.com',
//   hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
//   team_id: 2,
//   created_at: new Date('2016-06-29 14:26:16 UTC'),
//   updated_at: new Date('2016-06-29 14:26:16 UTC')
//     }
  // }];

exports.seed = function(knex, Promise) {
  //delete all existing rolls if any -- maybe you run the seed file too many times
  return knex('users').del()
    .then(function() {
      //then insert the data
      return knex('users').insert(data);
    })
    .then(function() {
      //update id to the maximum id using raw SQL
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) from users));");
    });
}
