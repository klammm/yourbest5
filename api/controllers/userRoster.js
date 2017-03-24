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

function score(req, res, next) {
  knex('players_teams').where('id', req.swagger.params.userid.value)
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
  .then((usersArray) => {
    const scoreArr = [];
    usersArray.forEach((player) => {
      player.filter((item) => {
        // console.log('item is!!! ' ,item);
      let scoreArrObj = {
        id: item.id,
        name: item.name,
        twopp: item.twopp,
        twoapg: item.twoapg,
        threepp: item.threepp,
        threeapg: item.threeapg,
        orpg: item.orpg,
        tpg: item.tpg,
        ftp: item.ftp,
        ftapg: item.ftapg
      };
       scoreArr.push(scoreArrObj)
      })
      return scoreArr;
    })
    return Promise.all(scoreArr)
    // return scoreArr
  })
    .then((scoreArr) => {
      // console.log(scoreArr[2]);
      let totals = [];
      // console.log(scoreArr);
      let teamTotals = {
        twopp : 0,
        twoapg : 0,
        threepp : 0,
        threeapg : 0,
        orpg : 0,
        tpg : 0,
        ftp : 0,
        ftapg : 0
      }

    scoreArr.forEach((stats) => {
      // console.log('stats are ', stats.twopp);
      teamTotals.twopp += stats.twopp,
      teamTotals.twoapg += stats.twoapg,
      teamTotals.threepp += stats.threepp,
      teamTotals.threeapg += stats.threeapg,
      teamTotals.orpg += stats.orpg,
      teamTotals.tpg += stats.tpg,
      teamTotals.ftp += stats.ftp,
      teamTotals.ftapg += stats.ftapg
    })
    return teamTotals

    })
    // .then((val) => {
    //   console.log('val are', val);
    //   // res.send(val)
    // })

  .catch((err) => {
    // next(err);
    console.error();(err);
  })
}
