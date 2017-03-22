'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../app');
const request = require('supertest').agent(app.listen());




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
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        teamid: 1,
        first_name: 'Kevin',
        last_name: 'KlamJohnson',
        team_id: 1
      }], done)
  })gst

});
