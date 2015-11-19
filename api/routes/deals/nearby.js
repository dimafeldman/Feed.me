// Require deal model
var Deal = require('../../models/deal');

// Require app config
var config = require('../../../config');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  
  // Validate radius
  if ( ! input.radius )
  {
    this.throw(400, "Please provide a radius for the nearby search.");   
  }
  
  // Get distance (in KM) and convert to degrees (1km = 111.12 degrees)
  var maxDistance = input.radius / 111.12;
  
  // Validate location
  if ( ! input.location || ! input.location.lng || ! input.location.lng )
  {
    this.throw(400, "Please provide a location object with latitude and longitude values.");   
  }
  
  // Prepare coordinates array
  var location = [ input.location.lat, input.location.lng ];
  
  // Get deals within max distance
  var deals = yield Deal.find(
  {
    location: 
    {
      $near: location,
      $maxDistance: maxDistance
    }
  });
  
  // Return deals
  this.body = { deals: deals };
};