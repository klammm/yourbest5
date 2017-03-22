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

function findAllUsers(req, res, next) {
  knex('users')
  .then((usersArray) => {
    const formattedArray = [];
    usersArray.forEach((user) => {
      let formattedObj = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        team_id: user.team_id,
      };
      formattedArray.push(formattedObj)
    })
    res.send(formattedArray)
  })
  .catch((err) => {
    next(err);
  })
}

function findUser(req, res, next) {
  // console.log('This is a user', req.swagger.params.userid.value);
  knex.select('first_name','id','last_name','team_id').from('users').where('id', req.swagger.params.userid.value)
  .then((result) => {
    // delete result[0].email
    // delete result[0].hashed_password
    res.send(result[0]);
  })
  .catch((err) => {
    next(err);
  });
  // res.send({'toast': 1})
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
