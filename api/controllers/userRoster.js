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
  createTeam: createTeam,
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

function createTeam(req, res, next) {
  knex('users').where({'id': req.swagger.params.userid.value, 'team_id': null})
  .then((result) => {
    let team = {name: req.body};
    return knex('teams').insert(team, '*');
  })
  .then((responseTeam) => {
    res.send(responseTeam[0])
  })
  .catch((err) => {
    next(err);
  })
}

function deleteTeam(req, res, next) {
  knex('users').where('id', req.swagger.params.userid.value)
  .then((result) => {
    let teamId = result[0].team_id;
    return knex('teams').where('id', teamId);
  })
  .then((team) => {
    let result = {
      id: Number(team[0].id),
      name: team[0].name.toString()
    }
    res.send(result)
    return knex('teams').where('id', team[0].id).del();
  })
  .catch( (err) => {
    next(err);
  })
}

function addPlayerUserRoster(req, res, next) {
  let teamResult;
  let playerToBeReplaced;
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
    teamResult = {"PG": 'blank', "SG": 'blank', 'SF': 'blank', 'PF': 'blank', "C": 'blank'};
    knexArray.forEach((player) => {
      teamResult[player[0].position] = player[0]
    })
    let query = req.query.position
    playerToBeReplaced = teamResult[query].id;
    return knex('users').where('id', req.swagger.params.userid.value);
  })
  .then((result) => {
    let teamId = result[0].team_id;
    return knex('players_teams').where({'team_id': teamId, 'player_id': playerToBeReplaced}).update('player_id', req.body.id);
  })
  .then((team) => {
    teamResult[req.query.position] = req.body
    res.send(teamResult)
  })
  .catch( (err) => {
    next(err);
  })
}

function updatePlayer(req, res, next) {
  knex('users').where('id', req.swagger.params.userid.value)
  .then((result) => {
    let teamId = result[0].team_id;
    return knex('players_teams').where({'team_id': teamId, 'player_id': req.query.currentPlayerID}).update('player_id', req.body);
  })
  .then(() => {
    return knex('players').where('id', req.body);
  })
  .then((result) => {
    res.send(result[0])
  })
  .catch( (err) => {
    next(err);
  })
}

// product of General Deep
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
