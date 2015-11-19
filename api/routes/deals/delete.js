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
  
  // Delete deal by ID
  yield Deal.remove({"_id": id});
  
  // Return success
  this.body = { success: true };
};