// Require deal model
var Deal = require('../../models/deal');

module.exports = function *()
{
  // Get provided ID
  var id = this.params.id;
  
  // Validate ID
  if ( ! id )
  {
    this.throw(400, "Please provide a deal ID.");
  }
  
  // Find deal by ID
  var deal = yield Deal.findById(id);
  
  // Bad ID?
  if ( ! deal._id )
  {
    this.throw(400, "An invalid deal ID was provided.");
  }
  
  // Return deal
  this.body = { deal: deal };
};