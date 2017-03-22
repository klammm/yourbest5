'use strict'

var util = require('util');
const knex = require('../../knex');

module.exports = {
  allPlayers: allPlayers,
  addPlayerNbaDB: addPlayerNbaDB,
  onePlayer: onePlayer,
  statRankings: statRankings,
  playerPositionRankings: playerPositionRankings,
}


function allPlayers(req, res) {
  knex('players')
  .then((result) => {
    const newArray = [];
    result.forEach((player) => {
      newArray.push(player)
    })
    console.log(result)
    res.send([{name: 'foxworthington', id: 1}])
    // res.send(result)
  })
  .catch( (err) => {
    next(err);
  })
}

function addPlayerNbaDB(req, res) {
  if (checkDBForPlayer(req.swagger.body)) {
    // prompt the user that the player exists already
  } else {
    knex('players').insert()

  }
}

function checkDBForPlayer(player) {
  // check if the DB has this player
}

function onePlayer(req, res) {
  knex('players').where('id', req.swagger.params.playerid)
  .then((result) => {
    if (result) {
      res.send(result)
    } else {
      // prompt the user "Invalid Player ID"
    }
  })
  .catch((err) => {
    next(err);
  })
}

function statRankings(req, res) {
  knex('players').orderBy(req.swagger.query.stat, 'desc')
}

function playerPositionRankings(req, res) {

}
