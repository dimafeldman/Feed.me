// Dependencies
var router = require('koa-router')();

// Route definitions
module.exports = function (app)
{
  // Deal-related routes
  router.put('/deals', require('./routes/deals/create'));
  
  // Use them  
  app.use(router.routes()).use(router.allowedMethods());
};