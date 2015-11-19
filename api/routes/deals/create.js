// Require deal model
var Deal = require('../../models/deal');

// Generator-compatible request library
var request = require('co-request');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  
  // Required fields
  var required = [ 'title', 'price', 'quantity', 'address' ];
  
  // Traverse required fields
  for ( var i in required )
  {
    // Get current field
    var field = required[i];
    
    // Is it empty?
    if ( ! input[ field ] )
    {
      this.throw(400, "Please provide the " + field + "." );
    }
  }
  
  // Geocode the address via the Google Maps Geocoding API
  var location = yield exports.geocodeAddress(input.address);
  
  // Create new deal model
  var deal = new Deal();
  
  // Set properties
  deal.location = location;
  deal.title = input.title;
  deal.price = input.price;
  deal.image = input.image;
  deal.address = input.address;
  deal.discount = input.discount;
  deal.quantity = input.quantity;
  deal.description = input.description;
  
  // Set creation date
  deal.created = new Date();
  
  // Save deal
  yield deal.save();
  
  // Return success
  this.body = { success: true };
};

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