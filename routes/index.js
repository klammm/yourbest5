'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// router.get('/users', (req, res) => {
//   console.log('hi');
//   res.sendStatus(200);
//
// });

// router.get('/users/:userid', (req, res, next) => {
//   console.log("it works!!")
//   knex('users').where('users', req.params.userid)
//   .then((result) => {
//     console.log(result)
//     res.send(result);
//   })
//   .catch((err) => {
//     next(err);
//   });
// })


module.exports = router;
