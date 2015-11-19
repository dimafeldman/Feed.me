
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
    this.throw(400, "Please provide one of the fields: " + one_required);
  }  
  
  
  var deals = yield Deal.find(
  {
    $or:
    [
      {"title" : {$regex: '.*'+input.text+'.*', $options: 'i'}},
      {"description" : {$regex: '.*'+input.text+'.*', $options: 'i'}}
    ],
    "seller" : {$regex: '.*'+input.seller+'.*', $options: 'i'}
  });
  
  // Return deals
  this.body = { deals: deals };
};


/*

location: 
    {
      $near: location,
      $maxDistance: maxDistance
    }
  // Validate location
  if ( ! input.location || ! input.location.lng || ! input.location.lng )
  {
    this.throw(400, "Please provide a location object with latitude and longitude values.");   
  }
  
  // Get distance (in KM) and convert to degrees (1km = 111.12 degrees)
  var maxDistance = input.radius / 111.12;

  // Prepare coordinates array
  var location = [ input.location.lat, input.location.lng ];
  
  // Get deals within max distance


*/