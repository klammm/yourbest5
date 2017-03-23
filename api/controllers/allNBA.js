'use strict'

var util = require('util');
const knex = require('../../knex');
const fetch = require('node-fetch');

module.exports = {
  allPlayers: allPlayers,
  addPlayerNbaDB: addPlayerNbaDB,
  onePlayer: onePlayer,
  statRankings: statRankings,
  playerPositionRankings: playerPositionRankings,
  playerHighlights: playerHighlights,
}


function allPlayers(req, res, next) {
  knex('players')
  .then((result) => {
    res.send(result)
  })
  .catch( (err) => {
    next(err);
  })
}

function addPlayerNbaDB(req, res, next) {
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

function statRankings(req, res, next) {
  knex('players').orderBy(req.swagger.params.stat.value, 'desc')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    next(err);
  })
}

function playerPositionRankings(req, res, next) {

}

function playerHighlights(req, res, next) {
  const apiKey = process.env.YOUTUBE_KEY;
  knex('players').where('id', req.swagger.params.playerid.value)
  .then((result) => {
    let player = result[0].name;
    player = player.split(' ').join('+')
    console.log(player)
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${player}` + `+highlights&type=video&key=${apiKey}`)
  })
  .then((fetchResult) => {
    // Bad request. API key not working
    console.log(fetchResult)
  })
  .catch((err) => {
    next(err);
  })
}
