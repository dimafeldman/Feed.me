// Load Mongoose interface
var mongoose = require('mongoose');

// Load config file
var config = require('../../config')

// Get config file for SQL connection
//var connection = mongoose.connect(config.db);

// Return connection
module.exports = mongoose;