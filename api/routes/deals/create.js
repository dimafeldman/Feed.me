// Require deal model
var Deal = require('../models/deal');

module.exports = function *()
{
  // Parse input from request body
  var input = this.request.body;
  
  // Create new deal model
  var deal = new Deal();
  
  // Set properties
  deal.title = input.title;
  deal.created_on = new Date();
  deal.updated_on = new Date();
  deal.description = input.description;
  
  // Save
  yield deal.save();
  
  // Return success
  this.body = { success: true };
};