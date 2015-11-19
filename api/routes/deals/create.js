// Require deal model
var Deal = require('../../models/deal');
var Gps = require('../../lib/gps');

// Generator-compatible request library
var request = require('co-request');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  
  // Required fields
  var required = [ 'title', 'price', 'quantity', 'address', 'seller'];
  
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
  var location = yield Gps.geocodeAddress(input.address);
  
  // Create new deal model
  var deal = new Deal();
  
  // Set properties
  deal.interested = 0;
  deal.location = location;
  deal.title = input.title;
  deal.seller = input.seller;
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