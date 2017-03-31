
const data = [{

  id: 1,
  first_name: 'Kevin',
  last_name: 'KlamJohnson',
  email: 'KlamJohnson@gmail.com',
  hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
  team_id: 1,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
},
{
  id: 2,
  first_name: 'KayDaddy',
  last_name: 'Zheng',
  email: 'KayDaddy@gmail.com',
  hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
  team_id: 2,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
},
{
  id: 3,
  first_name: 'Thrill',
  last_name: 'Clinton',
  email: 'Thrill4Life@gmail.com',
  hashed_password: '$2a$12$vnPy7I2Yy3AhUoLnsIHpneK9rBygQDwfQa4Ysbcq3MbQ66O4qMgku', //thriller
  team_id: 3,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
    }
  ];


exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return knex('users').insert(data);
    })
    .then(function() {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) from users));");
    });
}
