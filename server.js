//import dependencies
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes.js');
var path = require('path');
var cors = require ('cors');
var app = express();
var fs = require('fs');
var jwt = require('express-jwt');

//jwt middleware
var authCheck = jwt({
  secret: new Buffer('vvbacbW93BjVsha-Umhhz0LcHRq1SYs13ZbR_SXp7OgNnY48OZu6S6RC_bN9YEP0', 'base64'),
  audience: '9ZbTuQ2rS1kaqKXEDq3oBaRuOAGldqvQ'
});

//enable CORS
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set app to render static files
app.use(express.static(path.join(__dirname, 'client')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

//connect routes
routes(app, express);

//set port to whatever port heroku picks, default to 8080
port = process.env.PORT || 8080;

//create server and listen to port
var server = app.listen(port);
console.log('Listening on port ' + port);

//export app and server
module.exports = app;











