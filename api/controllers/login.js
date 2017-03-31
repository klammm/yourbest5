'use strict';
var util = require('util');
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser())
const dotenv = require('dotenv');
dotenv.load()

function userLogin(req, res) {
  let authUser;
  return knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      console.log(user);
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
          // console.log(auth);
          const token = jwt.sign({
              id: authUser.id,
              email: authUser.email,
              first_name: authUser.first_name,
              last_name: authUser.last_name,
            },
            process.env.JWT_KEY);

          return res.status(200).json({
            token
          })
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
