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

function findUserTeam() {
  
}

function deleteTeam() {

}

function addPlayerUserRoster() {

}

function updatePlayer() {

}

function score() {

}
