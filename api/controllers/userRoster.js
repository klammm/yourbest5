'use strict'

var util = require('util');
const knex = require('../../knex');

module.exports = {
  findAllUsers: findAllUsers,
  findUser: findUser,
  findUserTeam: findUserTeam,
  deleteTeam: deleteTeam,
  addPlayerUserRoster: addPlayerUserRoster,
  updatePlayer: updatePlayer,
  score: score,
}

function findAllUsers(req, res) {
  console.log('hello')
  const example = {
    id: 1,
    first_name: "Kaydaddy",
    last_name: "foxworthington",
    team_id: 2,
  };
  console.log(example)
  res.send([example]);
}

function findUser(req, res, next) {
  console.log('toast')
  res.send('foxworthington')
  knex('users').where('users', req.swagger.params.userid)
  .then((result) => {
    console.log(result)
    res.send(result);
  })
  .catch((err) => {
    next(err);
  });
}

function findUserTeam(req, res, next) {
  // grab the user from {userid} -> grab the team_id -> form the JSON object with the player_id matching the team_id
  // -> placing each player_id into their respective positions PG: player_id.position,
  knex('users').where('users', req.swagger.params.userid)
  .then((result) => {
    let teamId = result[0].team_id;
    return knex('players_teams').where('team_id', teamId)
  })
  .then((team) => {

  })
  .catch( (err) => {
    next(err);
  })
}

function matchPositionsToPositions(playerId) {
  // place the playerId into it's respective key
}

function deleteTeam(req, res) {

}

function addPlayerUserRoster(req, res) {

}

function updatePlayer(req, res) {

}

function score(req, res) {

}
