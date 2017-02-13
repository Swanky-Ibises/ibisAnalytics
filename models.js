//import mongoose and database
var mongoose = require('mongoose');
var db = require('./database.js')

//create new linkClick schema
var linkClickSchema = mongoose.Schema({
  domain: String,
  url: String,
  count: Number,
  date: Array
});

//create new pageView schema
var pageViewSchema = mongoose.Schema({
  domain: String,
  title: String,
  count: Number,
  date: Array
});

var pageTimeSchema = mongoose.Schema({
  domain: String,
  timesArray: Array
});

var addressSchema = mongoose.Schema({
  domain: String,
  locationArray: Array
});

var userSchema = mongoose.Schema({
  email: String,
  domain: String,
});

//create models for each schema
var linkClickModel = mongoose.model('linkClickSchema', linkClickSchema);
var pageViewModel = mongoose.model('pageViewSchema', pageViewSchema);
var pageTimeModel = mongoose.model('pageTimeSchema', pageTimeSchema);
var addressModel = mongoose.model('addressSchema', addressSchema);
var userModel = mongoose.model('userSchema', userSchema);

//export models
module.exports = {
  linkClickModel,
  pageViewModel,
  pageTimeModel,
  addressModel,
  userModel
};




