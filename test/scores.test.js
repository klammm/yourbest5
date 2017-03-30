// 'use strict';
//
// process.env.NODE_ENV = 'test';
//
// const { suite, test } = require('mocha');
// const app = require('../app');
// const request = require('supertest');
// const knex = require('../knex');
//
// suite('scores test', () => {
//   before((done) => {
//     knex.migrate.latest()
//       .then(() => {
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
//
//   beforeEach((done) => {
//     knex.seed.run()
//       .then(() => {
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
//   test('GET /scores', (done) => {
//     request(app)
//       .get('users/1/team/score')
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, [
//         {id: 1, player_id: 1, score: 2},
//         {id: 2, player_id: 2, score: 3},
//         {id: 3, player_id: 3, score: 4},
//
//       ], done)
//   });
// });
