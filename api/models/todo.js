// Get mongoose object
var db = require('../lib/db');

// Prepare schema
var schema = new db.Schema(
{
    name:           String,
    description:    String
} );

// Return model with schema linked to collection
module.exports = db.model( 'tests', schema );