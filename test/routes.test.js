'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const app = require('../app');



//how do use suite and go into regular test?
// suite('routes', () => {
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
