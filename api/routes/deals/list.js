// Require deal model
var Deal = require('../../models/deal');

module.exports = function *()
{
  // Get all deals
  var deals = yield Deal.find({});
  
  // Return deals
  this.body = { deals: deals };
};