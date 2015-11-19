// Load Mongoose interface
var mongoose = require('mongoose');

// Get config file for SQL connection
var connection = mongoose.connect('localhost/test');

// Return connection
module.exports = connection;