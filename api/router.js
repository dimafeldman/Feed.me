// Dependencies
var router = require('koa-router')();

// Route definitions
module.exports = function (app)
{  
  // Deal-related CRUD routes
  router.get('/deals', require('./routes/deals/list'));
  router.put('/deals', require('./routes/deals/create'));
  router.get('/deals/:id', require('./routes/deals/get'));
  router.delete('/deals/:id', require('./routes/deals/delete'));
  
  // Deal-related special routes
  router.post('/deals/nearby', require('./routes/deals/nearby'));
  router.get('/deals/:id/interested', require('./routes/deals/interested/set'));
  
  // Use them  
  app.use(router.routes()).use(router.allowedMethods());
};