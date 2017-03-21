'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.addPlayerNbaDB = function addPlayerNbaDB (req, res, next) {
  Default.addPlayerNbaDB(req.swagger.params, res, next);
};

module.exports.addPlayerUserRoster = function addPlayerUserRoster (req, res, next) {
  Default.addPlayerUserRoster(req.swagger.params, res, next);
};

module.exports.allPlayers = function allPlayers (req, res, next) {
  Default.allPlayers(req.swagger.params, res, next);
};

module.exports.deleteTeam = function deleteTeam (req, res, next) {
  Default.deleteTeam(req.swagger.params, res, next);
};

module.exports.findUser = function findUser (req, res, next) {
  Default.findUser(req.swagger.params, res, next);
};

module.exports.findUserTeam = function findUserTeam (req, res, next) {
  Default.findUserTeam(req.swagger.params, res, next);
};

module.exports.onePlayer = function onePlayer (req, res, next) {
  Default.onePlayer(req.swagger.params, res, next);
};

module.exports.playerPositionRankings = function playerPositionRankings (req, res, next) {
  Default.playerPositionRankings(req.swagger.params, res, next);
};

module.exports.score = function score (req, res, next) {
  Default.score(req.swagger.params, res, next);
};

module.exports.statRankings = function statRankings (req, res, next) {
  Default.statRankings(req.swagger.params, res, next);
};

module.exports.updatePlayer = function updatePlayer (req, res, next) {
  Default.updatePlayer(req.swagger.params, res, next);
};
