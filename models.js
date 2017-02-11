//import mongoose and database
var mongoose = require('mongoose');
var db = require('./database.js')

//create new linkClick schema
var linkClickSchema = mongoose.Schema({
  url: String,
  count: Number,
  date: Array
});

//create new pageView schema
var pageViewSchema = mongoose.Schema({
  title: String,
  count: Number,
  date: Array
});

var pageTimeSchema = mongoose.Schema({
  username: String,
  domain: String,
  timesArray: Array
});
//create models for each schema
var linkClickModel = mongoose.model('linkClickSchema', linkClickSchema);
var pageViewModel = mongoose.model('pageViewSchema', pageViewSchema);
var pageTimeModel = mongoose.model('pageTimeSchema', pageTimeSchema);

//export models
module.exports = {
  linkClickModel: linkClickModel,
  pageViewModel: pageViewModel,
  pageTimeModel: pageTimeModel
};