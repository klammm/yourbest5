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
  test('GET /api/users', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        'id': 1,
        'first_name': 'Kevin',
        'last_name': 'KlamJohnson',
      }, {
        'id': 2,
        'first_name': 'KayDaddy',
        'last_name': 'Zheng',
      },
      {
        'id': 3,
        'first_name': 'Thrill',
        'last_name': 'Clinton',
      }], done)
  });

  test('GET /api/users/:userid', (done) => {
    request(app)
    .get('/api/users/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {
      'id': 1,
      'first_name': 'Kevin',
      'last_name': 'KlamJohnson',
    }, done);

  });
});
