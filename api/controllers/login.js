'use strict';
let util = require('util');
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.load()

function userLogin(req, res) {
  let authUser;
  return knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        res.status(400).send('Invalid email');
      }
      authUser = user;
      let hashed_pass = authUser.hashed_password;
      return bcrypt.compare(req.body.password, hashed_pass)
        .then((auth) => {
          if (!auth) {
            res.status(400).send('Invalid password');
          }
          const token = jwt.sign({id: authUser.id},
            process.env.JWT_KEY);

            let userInfo = {
              id: authUser.id,
              email: authUser.email,
              first_name: authUser.first_name,
              last_name: authUser.last_name,
              token: token
              }
          return res.status(200).send(userInfo)
        })
        .catch((err) => {
          return res.status(400).json('bad email or password')
        })
    })
    .catch((err) => {
      return res.status(400).json('bademail or password')
    });
};

module.exports = {
  userLogin
}
