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
    res.send(result)
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

// helper function
function checkDBForPlayer(player) {
  // check if the DB has this player
}

function onePlayer(req, res, next) {
  knex('players').where('id', req.swagger.params.playerid.value)
  .then((result) => {
    res.send(result[0])
  })
  .catch((err) => {
    next(err);
  })
}

function statRankings(req, res) {
  knex('players').orderBy(req.swagger.params.stat.value, 'desc')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    next(err);
  })
}

function playerPositionRankings(req, res) {
  
}
