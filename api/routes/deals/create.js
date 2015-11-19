// Require deal model
var Deal = require('../../models/deal');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  
  // Required fields
  var required = [ 'title', 'price', 'quantity', 'location' ];
  
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
  
  // Location validation
  if ( ! input['location']['lat'] || ! input['location']['lng'] )
  {
    this.throw(400, "Please provide a location object with latitude and longitude values.");   
  }
  
  // Create new deal model
  var deal = new Deal();
  
  // Set properties
  deal.title = input.title;
  deal.created = new Date();
  deal.description = input.description;
  
  // Save
  yield deal.save();
  
  // Return success
  this.body = { success: true };
};