'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../app');
const request = require('supertest');
const knex = require('../knex');




suite('nba DB test', () => {
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
  // beforeEach((done) => {
  //   knex.migrate.rollback()
  //   .then(() => {
  //     return knex.migrate.latest();
  //   })
  //   .then(() => {
  //     knex.seed.run();
  //     done();
  //   })
  //   .catch((err) => {
  //       done(err);
  //     });
  // });
  test('GET /nba', (done) => {
    request(app)
      .get('/nba')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
          {
            id: 1,
            name: "Michael Jordan",
            position: 'SG',
            ppg: 30.1,
            apg: 5.3,
            rpg: 6.2,
            orpg: 1.6,
            bpg: 0.8,
            spg: 2.3,
            tpg: 2.7,
            fgp: .497,
            twopp: .51,
            threepp:.327,
            ftp: .835,
          },
          {
            id: 2,
            name: "Magic Johnson",
            position: 'PG',
            ppg: 19.5,
            apg: 11.2,
            rpg: 7.2,
            orpg: 1.8,
            bpg: 0.4,
            spg: 1.9,
            tpg: 3.9,
            fgp: .520,
            twopp: .54,
            threepp:.303,
            ftp: .848,
          },
          {
            id: 3,
            name: "Larry Bird",
            position: 'SF',
            ppg: 24.3,
            apg: 6.3,
            rpg: 10.0,
            orpg: 2,
            bpg: 0.8,
            spg: 1.7,
            tpg: 3.1,
            fgp: .496,
            twopp: .509,
            threepp:.376,
            ftp: .886,
          },
          {
            id: 4,
            name: "Kobe Bryant",
            position: 'SG',
            ppg: 25.0,
            apg: 4.7,
            rpg: 5.2,
            orpg: 1.1,
            bpg: 0.5,
            spg: 1.4,
            tpg: 3.0,
            fgp: .447,
            twopp: .479,
            threepp:.329,
            ftp: .837,
          },
          {
            id: 5,
            name: "Hakeem Olajuwon",
            position: 'C',
            ppg: 21.8,
            apg: 2.5,
            rpg: 11.1,
            orpg: 3.3,
            bpg: 3.1,
            spg: 1.7,
            tpg: 3.0,
            fgp: .512,
            twopp: .514,
            threepp:.202,
            ftp: .712,
          },
          {
            id: 6,
            name: "Shaquille O' Neal",
            position: 'C',
            ppg: 23.7,
            apg: 2.5,
            rpg: 10.9,
            orpg: 3.8,
            bpg: 2.3,
            spg: 0.6,
            tpg: 2.7,
            fgp: .582,
            twopp: .583,
            threepp: .045,
            ftp: .527,
          },
          {
            id: 7,
            name: "LeBron James",
            position: 'SF',
            ppg: 27.1,
            apg: 7.0,
            rpg: 7.2,
            orpg: 1.1,
            bpg: 0.8,
            spg: 1.7,
            tpg: 3.4,
            fgp: .500,
            twopp: .541,
            threepp: .343,
            ftp: .740,
          },
          {
            id: 8,
            name: "Allen Iverson",
            position: 'PG',
            ppg: 26.7,
            apg: 6.2,
            rpg: 3.7,
            orpg: 0.8,
            bpg: 0.2,
            spg: 2.2,
            tpg: 3.6,
            ftp: .780,
            twopp: .448,
            threepp: .313,
            fgp: .425,
          },
          {
            id: 9,
            name: "Charles Barkley",
            position: 'PF',
            ppg: 22.1,
            apg: 3.9,
            rpg: 11.7,
            orpg: 4,
            bpg: 0.8,
            spg: 1.5,
            tpg: 3.1,
            fgp: .541,
            twopp: .581,
            threepp: .266,
            ftp: .735,
          },
          {
            id: 10,
            name: "Tim Duncan",
            position: 'PF',
            ppg: 19.0,
            apg: 3.0,
            rpg: 10.8,
            orpg: 2.8,
            bpg: 2.2,
            spg: 0.7,
            tpg: 2.4,
            fgp: .506,
            twopp: .507,
            threepp: .179,
            ftp: .696,
          },
            {
            id: 11,
            name: "Steph Curry",
            position: 'SG',
            ppg: 22.7,
            apg: 6.8,
            rpg: 4.4,
            orpg: .7,
            bpg: 0.2,
            spg: 1.8,
            tpg: 3.2,
            fgp: .475,
            twopp: .507,
            threepp: .437,
            ftp: .904,
          }
        ], done)
  });
  test('GET /nba/:playerid', (done) => {
    request(app)
    .get('/nba/2')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {
            id: 2,
            name: "Magic Johnson",
            position: 'PG',
            ppg: 19.5,
            apg: 11.2,
            rpg: 7.2,
            orpg: 1.8,
            bpg: 0.4,
            spg: 1.9,
            tpg: 3.9,
            fgp: .520,
            twopp: .54,
            threepp:.303,
            ftp: .848,
          }, done);
  });
  test('GET /nba/rankings/:stat', (done) => {
    request(app)
    .get('/nba/rankings/ppg')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,[
          {
            id: 1,
            name: "Michael Jordan",
            position: 'SG',
            ppg: 30.1,
            apg: 5.3,
            rpg: 6.2,
            orpg: 1.6,
            bpg: 0.8,
            spg: 2.3,
            tpg: 2.7,
            fgp: .497,
            twopp: .51,
            threepp:.327,
            ftp: .835,
          },
          {
            id: 2,
            name: "Magic Johnson",
            position: 'PG',
            ppg: 19.5,
            apg: 11.2,
            rpg: 7.2,
            orpg: 1.8,
            bpg: 0.4,
            spg: 1.9,
            tpg: 3.9,
            fgp: .520,
            twopp: .54,
            threepp:.303,
            ftp: .848,
          },
          {
            id: 3,
            name: "Larry Bird",
            position: 'SF',
            ppg: 24.3,
            apg: 6.3,
            rpg: 10.0,
            orpg: 2,
            bpg: 0.8,
            spg: 1.7,
            tpg: 3.1,
            fgp: .496,
            twopp: .509,
            threepp:.376,
            ftp: .886,
          },
          {
            id: 4,
            name: "Kobe Bryant",
            position: 'SG',
            ppg: 25.0,
            apg: 4.7,
            rpg: 5.2,
            orpg: 1.1,
            bpg: 0.5,
            spg: 1.4,
            tpg: 3.0,
            fgp: .447,
            twopp: .479,
            threepp:.329,
            ftp: .837,
          },
          {
            id: 5,
            name: "Hakeem Olajuwon",
            position: 'C',
            ppg: 21.8,
            apg: 2.5,
            rpg: 11.1,
            orpg: 3.3,
            bpg: 3.1,
            spg: 1.7,
            tpg: 3.0,
            fgp: .512,
            twopp: .514,
            threepp:.202,
            ftp: .712,
          },
          {
            id: 6,
            name: "Shaquille O' Neal",
            position: 'C',
            ppg: 23.7,
            apg: 2.5,
            rpg: 10.9,
            orpg: 3.8,
            bpg: 2.3,
            spg: 0.6,
            tpg: 2.7,
            fgp: .582,
            twopp: .583,
            threepp: .045,
            ftp: .527,
          },
          {
            id: 7,
            name: "LeBron James",
            position: 'SF',
            ppg: 27.1,
            apg: 7.0,
            rpg: 7.2,
            orpg: 1.1,
            bpg: 0.8,
            spg: 1.7,
            tpg: 3.4,
            fgp: .500,
            twopp: .541,
            threepp: .343,
            ftp: .740,
          },
          {
            id: 8,
            name: "Allen Iverson",
            position: 'PG',
            ppg: 26.7,
            apg: 6.2,
            rpg: 3.7,
            orpg: 0.8,
            bpg: 0.2,
            spg: 2.2,
            tpg: 3.6,
            ftp: .780,
            twopp: .448,
            threepp: .313,
            fgp: .425,
          },
          {
            id: 9,
            name: "Charles Barkley",
            position: 'PF',
            ppg: 22.1,
            apg: 3.9,
            rpg: 11.7,
            orpg: 4,
            bpg: 0.8,
            spg: 1.5,
            tpg: 3.1,
            fgp: .541,
            twopp: .581,
            threepp: .266,
            ftp: .735,
          },
          {
            id: 10,
            name: "Tim Duncan",
            position: 'PF',
            ppg: 19.0,
            apg: 3.0,
            rpg: 10.8,
            orpg: 2.8,
            bpg: 2.2,
            spg: 0.7,
            tpg: 2.4,
            fgp: .506,
            twopp: .507,
            threepp: .179,
            ftp: .696,
          },
            {
            id: 11,
            name: "Steph Curry",
            position: 'SG',
            ppg: 22.7,
            apg: 6.8,
            rpg: 4.4,
            orpg: .7,
            bpg: 0.2,
            spg: 1.8,
            tpg: 3.2,
            fgp: .475,
            twopp: .507,
            threepp: .437,
            ftp: .904,
          }
        ], done)
  })
});























//
