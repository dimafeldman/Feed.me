// Require todo model
var Todo = require('../models/todo');

module.exports = function *() {
  // Grab all todo items
  var results = yield Todo.find({});
  
  // Return and embed in template
  yield this.render('index', {todos: results});
};