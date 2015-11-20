
/*
input:
    "location": {"address" : "6 Baruc St, Tel Aviv, Israel", // user's address
                 "radius" : 10}, // radius in KM
    "text": "Hamburger", // title and description
    "seller": "Moses",
    "time_range" : ["22:42:02",
                    "23:42:02"]
*/


// Require deal model
var Deal = require('../../models/deal');
var Gps = require('../../lib/gps');
var Dates = require('../../lib/dates');

// Require app config
var config = require('../../../config');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  var one_required = [ 'location', 'text', 'seller', 'time_range'];
  
  var hasMinFields = false;
  // Traverse required fields
  for ( var i in one_required )
  {
    // Get current field
    var field = one_required[i];
    
    // Is it empty?
    if ( input[ field ] )
    {
      hasMinFields = true;
    }
  }
  
  
  // Validate input
  if ( ! hasMinFields )
  {
    this.throw(400, "Please provide at least one of the fields: " + one_required);
  }  
  
  
  var query = {};
  if( input.text )
  {
    query.$or = [ {"title" : {$regex: '.*'+input.text+'.*', $options: 'i'}},
                  {"description" : {$regex: '.*'+input.text+'.*', $options: 'i'}} ];
  }
  
  if( input.seller )
  {
    query.seller = {$regex: '.*'+input.seller+'.*', $options: 'i'};
  }


  if( input.location )
  {
    if( ! input.location.radius)
    {
       input.location.radius= config.deals.search.default_radius;
    }
    
    if( ! input.location.address && (! input.location.lat || ! input.location.lng))
    {
       this.throw(400, "Location must have either address or lat and lng.");
    }
    
    if( input.location.address && (input.location.lat || input.location.lng))
    {
       this.throw(400, "Location must have one: address, or lat + lng.");
    }
    
    var gpsLocation;
    if(input.location.lat && input.location.lng)
    {
        gpsLocation = [ input.location.lat, input.location.lng ];
    }
    else // input.location.address
    {
        gpsLocation = yield Gps.geocodeAddress(input.location.address);
    }
    
    // Get distance (in KM) and convert to degrees (1km = 111.12 degrees)
    var maxDistance = input.location.radius / 111.12;
    
    
    query.location =  {
                        $near: gpsLocation,
                        $maxDistance: maxDistance
                      }
  }
  
  
  if( input.time_range )
  {
    if( input.time_range.length != 2)
    {
      this.throw(400, "Time range must have exactly two numbers.");
    }
    var minDate = Dates.getDateFromHour(input.time_range[0]);
    var maxDate = Dates.getDateFromHour(input.time_range[1]);
    query.when = { $gte: minDate,
                $lt: maxDate};
  }
  
  var deals = yield Deal.find(query);
  
  // Return deals
  this.body = { deals: deals };
};