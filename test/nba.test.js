'use strict';

process.env.NODE_ENV = 'test';

const {
  suite,
  test
} = require('mocha');
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
  test('GET /api/nba', (done) => {
    request(app)
      .get('/api/nba')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
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
          twoapg: 22.2,
          threepp: .327,
          threeapg: 1.7,
          ftp: .835,
          ftapg: 8.2
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
          twoapg: 12,
          threepp: .303,
          ftp: .848,
          threeapg: 1.2,
          ftapg: 6.5
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
          twoapg: 17.4,
          threepp: .376,
          threeapg: 1.9,
          ftp: .886,
          ftapg: 5.0
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
          twoapg: 15.3,
          threepp: .329,
          threeapg: 4.1,
          ftp: .837,
          ftapg: 7.4
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
          twoapg: 16.9,
          threepp: .202,
          threeapg: .1,
          ftp: .712,
          ftapg: 6.2
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
          twoapg: 16.1,
          threepp: .045,
          threeapg: 0,
          ftp: .527,
          ftapg: 9.3
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
          twoapg: 15.6,
          threepp: .343,
          threeapg: 2,
          ftp: .740,
          ftapg: 8.2
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
          twoapg: 18.1,
          threepp: .313,
          threeapg: 3.7,
          fgp: .425,
          ftapg: 8.9
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
          twoapg: 12.7,
          threepp: .266,
          threeapg: 1.9,
          ftp: .735,
          ftapg: 8.1
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
          twoapg: 14.5,
          threepp: .179,
          threeapg: 1.9,
          ftp: .696,
          ftapg: 6.1
        },
        {
          id: 11,
          name: "Stephen Curry",
          position: 'PG',
          ppg: 22.7,
          apg: 6.8,
          rpg: 4.4,
          orpg: .7,
          bpg: 0.2,
          spg: 1.8,
          tpg: 3.2,
          fgp: .475,
          twopp: .507,
          twoapg: 9.2,
          threepp: .437,
          threeapg: 7.6,
          ftp: .904,
          ftapg: 3.8
        }
      ], done)
  });
  test('GET /api/nba/:playerid', (done) => {
    request(app)
      .get('/api/nba/2')
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
        twoapg: 12,
        threepp: .303,
        ftp: .848,
        threeapg: 1.2,
        ftapg: 6.5
      }, done);
  });
  test('GET /api/nba/rankings/:stat', (done) => {
    request(app)
      .get('/api/nba/rankings/ppg')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
          id: 1,
          name: 'Michael Jordan',
          position: 'SG',
          ppg: 30.1,
          apg: 5.3,
          fgp: 0.497,
          twopp: 0.51,
          twoapg: 22.2,
          threepp: 0.327,
          threeapg: 1.7,
          ftp: 0.835,
          ftapg: 8.2,
          rpg: 6.2,
          orpg: 1.6,
          bpg: 0.8,
          spg: 2.3,
          tpg: 2.7
        },
        {
          id: 7,
          name: 'LeBron James',
          position: 'SF',
          ppg: 27.1,
          apg: 7,
          fgp: 0.5,
          twopp: 0.541,
          twoapg: 15.6,
          threepp: 0.343,
          threeapg: 2,
          ftp: 0.74,
          ftapg: 8.2,
          rpg: 7.2,
          orpg: 1.1,
          bpg: 0.8,
          spg: 1.7,
          tpg: 3.4
        },
        {
          id: 8,
          name: 'Allen Iverson',
          position: 'PG',
          ppg: 26.7,
          apg: 6.2,
          fgp: 0.425,
          twopp: 0.448,
          twoapg: 18.1,
          threepp: 0.313,
          threeapg: 3.7,
          ftp: 0.78,
          ftapg: 8.9,
          rpg: 3.7,
          orpg: 0.8,
          bpg: 0.2,
          spg: 2.2,
          tpg: 3.6
        },
        {
          id: 4,
          name: 'Kobe Bryant',
          position: 'SG',
          ppg: 25,
          apg: 4.7,
          fgp: 0.447,
          twopp: 0.479,
          twoapg: 15.3,
          threepp: 0.329,
          threeapg: 4.1,
          ftp: 0.837,
          ftapg: 7.4,
          rpg: 5.2,
          orpg: 1.1,
          bpg: 0.5,
          spg: 1.4,
          tpg: 3
        },
        {
          id: 3,
          name: 'Larry Bird',
          position: 'SF',
          ppg: 24.3,
          apg: 6.3,
          fgp: 0.496,
          twopp: 0.509,
          twoapg: 17.4,
          threepp: 0.376,
          threeapg: 1.9,
          ftp: 0.886,
          ftapg: 5,
          rpg: 10,
          orpg: 2,
          bpg: 0.8,
          spg: 1.7,
          tpg: 3.1
        },
        {
          id: 6,
          name: 'Shaquille O\' Neal',
          position: 'C',
          ppg: 23.7,
          apg: 2.5,
          fgp: 0.582,
          twopp: 0.583,
          twoapg: 16.1,
          threepp: 0.045,
          threeapg: 0,
          ftp: 0.527,
          ftapg: 9.3,
          rpg: 10.9,
          orpg: 3.8,
          bpg: 2.3,
          spg: 0.6,
          tpg: 2.7
        },
        {
          id: 11,
          name: 'Stephen Curry',
          position: 'PG',
          ppg: 22.7,
          apg: 6.8,
          fgp: 0.475,
          twopp: 0.507,
          twoapg: 9.2,
          threepp: 0.437,
          threeapg: 7.6,
          ftp: 0.904,
          ftapg: 3.8,
          rpg: 4.4,
          orpg: 0.7,
          bpg: 0.2,
          spg: 1.8,
          tpg: 3.2
        },
        {
          id: 9,
          name: 'Charles Barkley',
          position: 'PF',
          ppg: 22.1,
          apg: 3.9,
          fgp: 0.541,
          twopp: 0.581,
          twoapg: 12.7,
          threepp: 0.266,
          threeapg: 1.9,
          ftp: 0.735,
          ftapg: 8.1,
          rpg: 11.7,
          orpg: 4,
          bpg: 0.8,
          spg: 1.5,
          tpg: 3.1
        },
        {
          id: 5,
          name: 'Hakeem Olajuwon',
          position: 'C',
          ppg: 21.8,
          apg: 2.5,
          fgp: 0.512,
          twopp: 0.514,
          twoapg: 16.9,
          threepp: 0.202,
          threeapg: 0.1,
          ftp: 0.712,
          ftapg: 6.2,
          rpg: 11.1,
          orpg: 3.3,
          bpg: 3.1,
          spg: 1.7,
          tpg: 3
        },
        {
          id: 2,
          name: 'Magic Johnson',
          position: 'PG',
          ppg: 19.5,
          apg: 11.2,
          fgp: 0.52,
          twopp: 0.54,
          twoapg: 12,
          threepp: 0.303,
          threeapg: 1.2,
          ftp: 0.848,
          ftapg: 6.5,
          rpg: 7.2,
          orpg: 1.8,
          bpg: 0.4,
          spg: 1.9,
          tpg: 3.9
        },
        {
          id: 10,
          name: 'Tim Duncan',
          position: 'PF',
          ppg: 19,
          apg: 3,
          fgp: 0.506,
          twopp: 0.507,
          twoapg: 14.5,
          threepp: 0.179,
          threeapg: 1.9,
          ftp: 0.696,
          ftapg: 6.1,
          rpg: 10.8,
          orpg: 2.8,
          bpg: 2.2,
          spg: 0.7,
          tpg: 2.4
        }
      ], done)
  })
});
