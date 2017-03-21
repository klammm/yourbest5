'use strict';

exports.addPlayerNbaDB = function(args, res, next) {
  /**
   * Creates a new player within the database
   *
   * player PlayerResponse new player being added to the database (optional)
   * returns playerResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "image" : "aeiou",
  "ftp" : 123456789,
  "ppg" : 123456789,
  "name" : "aeiou",
  "rpg" : 123456789,
  "bpg" : 123456789,
  "apg" : 123456789,
  "tpg" : 123456789,
  "id" : 123456789,
  "spg" : 123456789,
  "fgp" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.addPlayerUserRoster = function(args, res, next) {
  /**
   * Add one player to the team
   *
   * userid Long The user id that is logged in
   * position String The position seeking to be placed into
   * newPlayer PlayerResponse New player to be added to the team
   * returns rosterResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.allPlayers = function(args, res, next) {
  /**
   * Returns all players from the database
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "image" : "aeiou",
  "ftp" : 123456789,
  "ppg" : 123456789,
  "name" : "aeiou",
  "rpg" : 123456789,
  "bpg" : 123456789,
  "apg" : 123456789,
  "tpg" : 123456789,
  "id" : 123456789,
  "spg" : 123456789,
  "fgp" : 123456789
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.deleteTeam = function(args, res, next) {
  /**
   * Deletes the user's team
   *
   * userid Long The user id that is logged in
   * returns rosterResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.findUser = function(args, res, next) {
  /**
   * Returns the user's dashboard home page
   *
   * userid Long The user id that is logged in
   * returns userResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "last_name" : "aeiou",
  "id" : 123456789,
  "team_id" : 123456789,
  "first_name" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.findUserTeam = function(args, res, next) {
  /**
   * Returns the user's team
   *
   * userid Long The user id that is logged in
   * returns teamResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "SF" : "",
  "C" : "",
  "SG" : "",
  "PF" : "",
  "PG" : {
    "image" : "aeiou",
    "ftp" : 123456789,
    "ppg" : 123456789,
    "name" : "aeiou",
    "rpg" : 123456789,
    "bpg" : 123456789,
    "apg" : 123456789,
    "tpg" : 123456789,
    "id" : 123456789,
    "spg" : 123456789,
    "fgp" : 123456789
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.onePlayer = function(args, res, next) {
  /**
   * Returns a specific player from the database
   *
   * playerid Long The player id being searched for
   * returns playerResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "image" : "aeiou",
  "ftp" : 123456789,
  "ppg" : 123456789,
  "name" : "aeiou",
  "rpg" : 123456789,
  "bpg" : 123456789,
  "apg" : 123456789,
  "tpg" : 123456789,
  "id" : 123456789,
  "spg" : 123456789,
  "fgp" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.playerPositionRankings = function(args, res, next) {
  /**
   * Returns the rankings for a certain position
   *
   * position String The position being searched for
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "image" : "aeiou",
  "ftp" : 123456789,
  "ppg" : 123456789,
  "name" : "aeiou",
  "rpg" : 123456789,
  "bpg" : 123456789,
  "apg" : 123456789,
  "tpg" : 123456789,
  "id" : 123456789,
  "spg" : 123456789,
  "fgp" : 123456789
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.score = function(args, res, next) {
  /**
   * Returns the team's +/- score
   *
   * userid Long The user id that is logged in
   * returns plusminusResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "score" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.statRankings = function(args, res, next) {
  /**
   * Returns the rankings for a certain stat
   *
   * stat String The stat being searched for
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "result" : 123456789,
  "name" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updatePlayer = function(args, res, next) {
  /**
   * Replace a player in the team
   *
   * userid Long The user id that is logged in
   * position String The position seeking to be placed into
   * newPlayer PlayerResponse New player to be added to the team
   * returns playerResponse
   **/
  var examples = {};
  examples['application/json'] = {
  "image" : "aeiou",
  "ftp" : 123456789,
  "ppg" : 123456789,
  "name" : "aeiou",
  "rpg" : 123456789,
  "bpg" : 123456789,
  "apg" : 123456789,
  "tpg" : 123456789,
  "id" : 123456789,
  "spg" : 123456789,
  "fgp" : 123456789
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

