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
  knex('players').where('name', req.body.name)
  .then((result) => {
    if (result.length > 1) {
      res.send({Message: "Player already exists. Thank you for your thought and contribution."})
    } else {
      return knex('players').insert({
        "name": req.body.name,
        "position": req.body.position,
        "ppg": req.body.ppg,
        "apg": req.body.apg,
        "rpg": req.body.rpg,
        "orpg": req.body.orpg,
        "bpg": req.body.bpg,
        "spg": req.body.spg,
        "tpg": req.body.tpg,
        "fgp": req.body.fgp,
        "twopp": req.body.twopp,
        "threepp": req.body.threepp,
        "ftp": req.body.ftp,
      })
    }
  })
  .then(() => {
    return knex('players')
  })
  .then((allPlayers) => {
    res.send(allPlayers[allPlayers.length - 1])
  })
  .catch((err) => {
    next(err);
  })
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
  let player;
  knex('players').where('id', req.swagger.params.playerid.value)
  .then((result) => {
    player = result[0].name;
    player = player.split(' ').join('+')
    // console.log(player)
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${player}` + `+highlights&type=video&key=${apiKey}`)
  })
  .then((fetchResult) => {
    return fetchResult.json()
  })
  .then((fetchJson) => {
    let videoId = fetchJson.items[0].id.videoId;
    let title = fetchJson.items[0].snippet.title;
    if (youtubeTitleCleaner(player, title)) {
      res.send({url: `https://www.youtube.com/watch?v=${videoId}`})
    } else {
      res.send({error: 'My apologies. It seems we have some discussing to do about the result. Please make a pull request.'}).status(500)
    }
  })
  .catch((err) => {
    next(err);
  })
}

// helper function for playerHighlights
function youtubeTitleCleaner(string, stringComparison) {
  // Example input: Michael Jordan's Top 50 all time plays
  let stringsToCompare = string.split('+');
  let regexString = '';
  for (let i = 0; i < stringsToCompare.length; i++) {
    if (i === stringsToCompare.length - 1) {
      regexString += '(' + stringsToCompare[i] + ")"
    } else {
      regexString += '(' + stringsToCompare[i] + ")" + String.raw`\s+`
    }
  }
  const regex = new RegExp(regexString, "ig")
  return regex.test(stringComparison)
}
