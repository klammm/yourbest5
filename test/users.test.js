'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../app');
const request = require('supertest');
const knex = require('../knex');




suite('users test', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test('GET /users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        'id': 1,
        'first_name': 'Kevin',
        'last_name': 'KlamJohnson',
        // email: 'KlamJohnson@gmail.com',
        // hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      }, {
        'id': 2,
        'first_name': 'KayDaddy',
        'last_name': 'Zheng',
        // email: 'KayDaddy@gmail.com',
        // hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',

      }], done)
  });

  test('GET /users/:userid', (done) => {
    request(app)
    .get('/users/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {
      'id': 1,
      'first_name': 'Kevin',
      'last_name': 'KlamJohnson',
      // email: 'KlamJohnson@gmail.com',
      // hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      'team_id': 1
    }, done);

});


//   test('GET /users/:userid/team', (done) => {
//     request(app)
//     .get('/users/1/team')
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200, {np
//       'PG': {'Steph Curry'},
//       'SG': {'Michael Jordan'},
//       'SF': {'LeBitch James'},
//       'PF': {'Tim Duncan'},
//       'C': {'Shaq'}
//     }, done);npm
// });
});























//
