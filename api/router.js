// Dependencies
var router = require('koa-router')();

// Route definitions
module.exports = function (app)
{
  // Set TODO routes
  router.get('/todo/new', require('./routes/add'));
  router.get('/todo/:id', require('./routes/show'));
  router.get('/todo/delete/:id', require('./routes/remove'));
  router.get('/todo/edit/:id', require('./routes/edit'));
  router.post('/todo/create', require('./routes/create'));
  router.post('/todo/update', require('./routes/update'));
  
  // Use them  
  app.use(router.routes()).use(router.allowedMethods());
};