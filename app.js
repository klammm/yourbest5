'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
app.use(express.static(path.join('public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});


module.exports = app; // for testing
