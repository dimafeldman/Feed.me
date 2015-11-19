// Require todo model
var Todo = require('../models/todo');

module.exports = function *(id) {
  // Remove a todo by ID
  yield Todo.remove({"_id": id});
  
  // Redirect to index
  this.redirect('/');
};