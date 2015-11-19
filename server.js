// Dependencies
var http        = require('http')
  , koa         = require('koa')
  , views       = require('koa-views')
  , logger      = require('koa-logger')
  , serve       = require('koa-static')
  , stylus      = require('koa-stylus')
  , bodyParser  = require('koa-bodyparser');

// Custom Koa middleware
var router = require('./api/router');
var error = require('./api/lib/error');

// Create koa app
var app = koa();

// Koa middleware
app.use(error());
app.use(logger());
app.use(bodyParser());
app.use(serve('./public'));
app.use(stylus('./public'));

// Views middleware
app.use(views('views', {map:{html:'swig'}}));

// Define routes
router(app);

// Define configurable port
var port = process.env.PORT || 3000;

// Listen for connections
app.listen(port);

// Log port
console.log('Server listening on port ' + port);
