'use strict'

var util = require('util');
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');

module.exports = {
  findAllUsers: findAllUsers,
  findUser: findUser,
  findUserTeam: findUserTeam,
  deleteTeam: deleteTeam,
  addPlayerUserRoster: addPlayerUserRoster,
  updatePlayer: updatePlayer,
  score: score,
  createTeam: createTeam,
  signUp: signUp
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
  let teamName;
  let teamId;
  let arrayOfPlayerIds = [req.body.PG, req.body.SG, req.body.SF, req.body.PF, req.body.C];
  knex('users').where({'id': req.swagger.params.userid.value, 'team_id': null})
  .then((result) => {
    teamName = req.query.name
    return knex('teams').insert({"name": teamName}, '*');
  })
  .then((insertResponse) => {
    teamId = insertResponse[0].id
    return knex('users').where({'id': req.swagger.params.userid.value}).update("team_id", insertResponse[0].id)
  })
  .then(() => {
    let insertArray = arrayOfPlayerIds.map((player) => {
      let insertObj = {};
      insertObj['team_id'] = teamId
      insertObj['player_id'] = player
      return insertObj
    });
    return knex('players_teams').insert(insertArray);
  })
  .then(() => {
    let promiseArray = arrayOfPlayerIds.map((id) => {
      return knex('players').where('id', id)
    })

    return Promise.all(promiseArray)
  })
  .then((knexArray) => {
    let teamResult = {"PG": 'blank', "SG": 'blank', 'SF': 'blank', 'PF': 'blank', "C": 'blank'};
    knexArray.forEach((player) => {
      teamResult[player[0].position] = player[0]
    })
    let responseObj = {
      team_name: teamName,
      team: teamResult
    };
    res.send(responseObj)
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
    return knex('players_teams').where({'team_id': teamId, 'player_id': req.query.id}).update('player_id', req.body);
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
function score(req, res, next) {
  knex('players_teams').where('id', req.swagger.params.userid.value)
  .then((result) => {
    let teamId = result[0].id;
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
    })
    return scoreArr
  })
    .then((scoreArr) => {
      let totals = [];
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
    .then((val) => {
      let teamTPG = val.tpg * 0.5 //weighing t/o by half, decrease FGA by this #
      let teamORPG = val.orpg * 0.5; //weighing orpg by half, increase FGA by this #
      let team2PP = val.twopp/5;
      let team2APG = val.twoapg - teamTPG + teamORPG;
      let team3PP = val.threepp/5;
      let team3APG = val.threeapg;
      let teamFTP = val.ftp/5;
      let teamtFTM = val.ftapg * teamFTP;

      let score = teamtFTM+team2APG+team3APG
      let team = {
        score: score
      };
      res.send(team)
    })

  .catch((err) => {
    next(err);
  })
}

function signUp(req, res, next) {
      knex('users')
      .then((users) => {
        console.log('users are ........', users);
        const user = {};
        Object.keys(req.body).forEach((key) => {
          user[key] = req.body[key];
        });
        if (Object.keys(user).some(field => field === "") || !user.email || !user.password) {
          res.status(400).send("must not be Blank");
        }
        if (user.password.length < 8) {
          res.status(400).send("must be at least 8 characters long");
        }
        knex("users")
          .where("email", user.email)
          .then((users) => {
            if (users[0]) {
              res.status(400).send("already exists");
            }
            bcrypt.hash(user.password, 12)
              .then((hashed_password) => {
                delete user.password;
                user.hashed_password = hashed_password;
                return knex("users")
                  .insert((user), '*')
              })
              .then((users) => {
                delete users[0].hashed_password;
                res.send(users[0]);
              })
              .catch((err) => {
                if (err) {
                  next(err);
                }
              });
          })
      })
    }
