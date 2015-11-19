// Dependencies
var http        = require('http')
  , koa         = require('koa')
  , logger      = require('koa-logger')
  , serve       = require('koa-static')
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

// Define routes
router(app);

// Serve public files if no routes match
app.use(serve('./public'));

// Define configurable port
var port = process.env.PORT || 3000;

// Listen for connections
app.listen(port);

// Log port
console.log('Server listening on port ' + port);
