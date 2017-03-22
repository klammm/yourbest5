'use strict'

var util = require('util');
const knex = require('../../knex');

module.exports = {
  findUser: findUser,
  findUserTeam: findUserTeam,
  deleteTeam: deleteTeam,
  addPlayerUserRoster: addPlayerUserRoster,
  updatePlayer: updatePlayer,
  score: score,
}

function findUser(req, res) {
  knex('users').where('users', req.swagger.params.userid)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    next(err);
  });
}

function findUserTeam(req, res) {
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
