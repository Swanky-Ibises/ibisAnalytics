//import mongoose
var mongoose = require('mongoose');

//connect to mLab database via heroku
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/analyticdata');

var db = mongoose.connection;

//handle errors on connection
db.on('error', console.error.bind(console, 'connection error'));

//handle successful connection
db.once('open', function() {
  console.log('Successfuly connected to database')
});

//export database connection
module.exports = db;




