// Dependencies
var route = require('koa-route');

// Route definitions
module.exports = function router(app)
{
  // Set TODO routes
  app.use(route.get('/todo/new', require('./routes/add')));
  app.use(route.get('/todo/:id', require('./routes/show')));
  app.use(route.get('/todo/delete/:id', require('./routes/remove')));
  app.use(route.get('/todo/edit/:id', require('./routes/edit')));
  app.use(route.post('/todo/create', require('./routes/create')));
  app.use(route.post('/todo/update', require('./routes/update')));
};