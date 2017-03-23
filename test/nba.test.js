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
  test('GET /nba', (done) => {
    request(app)
      .get('/nba')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        name: "Michael Jordan",
        position: 'SG',
        image: "",
        ppg: 30.1,
        apg: 5.3,
        rpg: 6.2,
        bpg: 0.8,
        spg: 2.3,
        tpg: 2.7,
        fgp: .497,
        ftp: .835,
        tpp: .327,
      },
      {
        id: 2,
        name: "Magic Johnson",
        position: 'PG',
        image: '',
        ppg: 19.5,
        apg: 11.2,
        rpg: 7.2,
        bpg: 0.4,
        spg: 1.9,
        tpg: 3.9,
        fgp: .520,
        ftp: .848,
        tpp: .303,
      },
      {
        id: 3,
        name: "Larry Bird",
        position: 'SF',
        image: '',
        ppg: 24.3,
        apg: 6.3,
        rpg: 10.0,
        bpg: 0.8,
        spg: 1.7,
        tpg: 3.1,
        fgp: .496,
        ftp: .886,
        tpp: .376,
      },
      {
        id: 4,
        name: "Kobe Bryant",
        position: 'SG',
        image: '',
        ppg: 25.0,
        apg: 4.7,
        rpg: 5.2,
        bpg: 0.5,
        spg: 1.4,
        tpg: 3.0,
        fgp: .447,
        ftp: .837,
        tpp: .329,
      },
      {
        id: 5,
        name: "Hakeem Olajuwon",
        position: 'C',
        image: '',
        ppg: 21.8,
        apg: 2.5,
        rpg: 11.1,
        bpg: 3.1,
        spg: 1.7,
        tpg: 3.0,
        fgp: .512,
        ftp: .712,
        tpp: .202,
      },
      {
        id: 6,
        name: "Shaquille O' Neal",
        position: 'C',
        image: '',
        ppg: 23.7,
        apg: 2.5,
        rpg: 10.9,
        bpg: 2.3,
        spg: 0.6,
        tpg: 2.7,
        fgp: .582,
        ftp: .527,
        tpp: .045,
      },
      {
        id: 7,
        name: "LeBron James",
        position: 'SF',
        image: '',
        ppg: 27.1,
        apg: 7.0,
        rpg: 7.2,
        bpg: 0.8,
        spg: 1.7,
        tpg: 3.4,
        fgp: .500,
        ftp: .740,
        tpp: .343,
      },
      {
        id: 8,
        name: "Allen Iverson",
        position: 'PG',
        image: '',
        ppg: 26.7,
        apg: 6.2,
        rpg: 3.7,
        bpg: 0.2,
        spg: 2.2,
        tpg: 3.6,
        ftp: .780,
        fgp: .425,
        tpp: .313,
      },
      {
        id: 9,
        name: "Charles Barkley",
        position: 'PF',
        image: '',
        ppg: 22.1,
        apg: 3.9,
        rpg: 11.7,
        bpg: 0.8,
        spg: 1.5,
        tpg: 3.1,
        fgp: .541,
        ftp: .735,
        tpp: .266,
      },
      {
        id: 10,
        name: "Tim Duncan",
        position: 'PF',
        image: '',
        ppg: 19.0,
        apg: 3.0,
        rpg: 10.8,
        bpg: 2.2,
        spg: 0.7,
        tpg: 2.4,
        fgp: .506,
        ftp: .696,
        tpp: .179,
      }], done)
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
      image: '',
      ppg: 19.5,
      apg: 11.2,
      rpg: 7.2,
      bpg: 0.4,
      spg: 1.9,
      tpg: 3.9,
      fgp: .520,
      ftp: .848,
      tpp: .303,
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
          position: "SG",
          image: "",
          ppg: 30.1,
          apg: 5.3,
          fgp: 0.497,
          ftp: 0.835,
          tpp: 0.327,
          rpg: 6.2,
          bpg: 0.8,
          spg: 2.3,
          tpg: 2.7
      }, {
          id: 7,
          name: "LeBron James",
          position: "SF",
          image: "",
          ppg: 27.1,
          apg: 7,
          fgp: 0.5,
          ftp: 0.74,
          tpp: 0.343,
          rpg: 7.2,
          bpg: 0.8,
          spg: 1.7,
          tpg: 3.4
      }, {
          id: 8,
          name: "Allen Iverson",
          position: "PG",
          image: "",
          ppg: 26.7,
          apg: 6.2,
          fgp: 0.425,
          ftp: 0.78,
          tpp: 0.313,
          rpg: 3.7,
          bpg: 0.2,
          spg: 2.2,
          tpg: 3.6
      }, {
          id: 4,
          name: "Kobe Bryant",
          position: "SG",
          image: "",
          ppg: 25,
          apg: 4.7,
          fgp: 0.447,
          ftp: 0.837,
          tpp: 0.329,
          rpg: 5.2,
          bpg: 0.5,
          spg: 1.4,
          tpg: 3
      }, {
          id: 3,
          name: "Larry Bird",
          position: "SF",
          image: "",
          ppg: 24.3,
          apg: 6.3,
          fgp: 0.496,
          ftp: 0.886,
          tpp: 0.376,
          rpg: 10,
          bpg: 0.8,
          spg: 1.7,
          tpg: 3.1
      }, {
          id: 6,
          name: "Shaquille O' Neal",
          position: "C",
          image: "",
          ppg: 23.7,
          apg: 2.5,
          fgp: 0.582,
          ftp: 0.527,
          tpp: 0.045,
          rpg: 10.9,
          bpg: 2.3,
          spg: 0.6,
          tpg: 2.7
      }, {
          id: 9,
          name: "Charles Barkley",
          position: "PF",
          image: "",
          ppg: 22.1,
          apg: 3.9,
          fgp: 0.541,
          ftp: 0.735,
          tpp: 0.266,
          rpg: 11.7,
          bpg: 0.8,
          spg: 1.5,
          tpg: 3.1
      }, {
          id: 5,
          name: "Hakeem Olajuwon",
          position: "C",
          image: "",
          ppg: 21.8,
          apg: 2.5,
          fgp: 0.512,
          ftp: 0.712,
          tpp: 0.202,
          rpg: 11.1,
          bpg: 3.1,
          spg: 1.7,
          tpg: 3
      }, {
          id: 2,
          name: "Magic Johnson",
          position: "PG",
          image: "",
          ppg: 19.5,
          apg: 11.2,
          fgp: 0.52,
          ftp: 0.848,
          tpp: 0.303,
          rpg: 7.2,
          bpg: 0.4,
          spg: 1.9,
          tpg: 3.9
      }, {
          id: 10,
          name: "Tim Duncan",
          position: "PF",
          image: "",
          ppg: 19,
          apg: 3,
          fgp: 0.506,
          ftp: 0.696,
          tpp: 0.179,
          rpg: 10.8,
          bpg: 2.2,
          spg: 0.7,
          tpg: 2.4
      }], done)
  })
});























//
