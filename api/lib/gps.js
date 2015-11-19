
// Generator-compatible request library
var request = require('co-request');

exports.geocodeAddress = function*(address)
{
  // Google Maps Geocoding API URL
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address);
  
  // Geocode the address via the Google Maps Geocoding API
  var geocode = yield request.get({url:url, json:true});
  
  // Get geocode response
  var response = geocode.body;
  
  // Failed?
  if ( response.results.length == 0 )
  {
    throw new Error("An invalid address was provided.");
  }
  
  // Get first result
  var result = response.results[0];
  
  // Return 2d result array
  return [result.geometry.location.lat, result.geometry.location.lng];
}