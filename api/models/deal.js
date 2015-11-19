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
    address:        String,
    quantity:       Number,
    interested:     [Object],
    created:        Date,
    location:
    {
        type: [Number],
        index: '2d'
    }
} );

// Index locatio field as 2d geospatial index
schema.index({location: '2d'});

// Return model with schema linked to collection
module.exports = db.model( 'deals', schema );