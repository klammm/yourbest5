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
  knex.select('first_name','id','last_name','team_id').from('users').where('id', req.swagger.params.userid.value)
  .then((result) => {
    if (result.length < 1) {
      res.send({message: "User not found"}).status(404);
    } else {
      res.send(result[0]);
    }
  })
  .catch((err) => {
    next(err);
  });
}

function findUserTeam(req, res, next) {
  // grab the user from {userid} -> grab the team_id -> form the JSON object with the player_id matching the team_id
  // -> placing each player_id into their respective positions PG: player_id.position,
  knex('users').where('id', req.swagger.params.userid.value)
  .then((result) => {
    let teamId = result[0].team_id;
    return knex('players_teams').where('team_id', teamId);
  })
  .then((team) => {
    let teamArray = team.map((player) => {
      return player.player_id
    })
    let promiseArray = teamArray.map((player) => {
      return knex('players').where('id', player)
    })
    return Promise.all(promiseArray)
  })
  .then((knexArray) => {
    let teamResult = {"PG": 'blank', "SG": 'blank', 'SF': 'blank', 'PF': 'blank', "C": 'blank'};
    knexArray.forEach((player) => {
      teamResult[player[0].position] = player[0]
    })
    res.send(teamResult)
  })
  .catch( (err) => {
    next(err);
  })
}

function deleteTeam(req, res) {

}

function addPlayerUserRoster(req, res) {

}

function updatePlayer(req, res) {

}

function score(req, res) {

}
