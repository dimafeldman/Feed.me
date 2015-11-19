// Get mongoose object
var db = require('../lib/db');

// Prepare schema
var schema = new db.Schema(
{
    title:          String,
    price:          String,
    image:          String,
    discount:       String,
    description:    String,
    created:        Integer,
    quantity:       Integer
} );

// Return model with schema linked to collection
module.exports = db.model( 'deals', schema );