// Get mongoose object
var db = require('../lib/db');

// Prepare schema
var schema = new db.Schema(
{
    title:          String,
    price:          String,
    image:          String,
    location:       Object,
    discount:       String,
    description:    String,
    quantity:       Number,
    created:        Date
} );

// Return model with schema linked to collection
module.exports = db.model( 'deals', schema );