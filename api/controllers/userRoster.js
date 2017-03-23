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
  knex.select('first_name','id','last_name').from('users').where('id', req.swagger.params.userid.value)
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
    if (teamId) {
      return knex('players_teams').where('team_id', teamId);
    } else {
      res.send({message: "No Team Available"}).status(404);
    }
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
  // knex delete

  // response
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

function addPlayerUserRoster(req, res) {

}

function updatePlayer(req, res) {

}

function score(req, res) {
  knex('scores')
  .then((usersArray) => {
    // console.log(usersArray);
    const scoreArr = [];
    usersArray.forEach((player) => {
      let scoreArrObj = {
        id: player.id,
        // name: player.first_name,
        score: player.score
      };
      scoreArr.push(scoreArrObj)
    })
    // res.send(scoreArr)
    return Promise.all(scoreArr)
  })
  .then((score) => {
    console.log(score);
    res.send(score)
  })
  .catch((err) => {
    next(err);
  })
}
