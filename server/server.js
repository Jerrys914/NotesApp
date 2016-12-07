var db = require('../db/index.js');
var express = require('express');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var methodOverride = require('method-override');
var partials = require('express-partials');
var parser = require('body-parser');
var morgan = require('morgan');
var router = require('./routes.js');
var app = express();
var models = require('./models/models.js')
module.exports.app = app;

app.set('port',process.env.PORT || 5468);
app.use(morgan('dev'));
app.use(parser.json());
app.use(router);
app.use(express.static(path.join(__dirname, '/../client')));

if(!module.parent) {
  app.listen(app.get('port'));
  console.log('Notes-App Listening on ', app.get('port'));
}