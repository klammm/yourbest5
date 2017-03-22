'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/users', (req, res) => {
  console.log('hi');
  res.sendStatus(200);

});


module.exports = router;
