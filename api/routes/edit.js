// Require todo model
var Todo = require('../models/todo');

module.exports = function *(id) {
  // Find a todo item by ID
  var result = yield Todo.findById(id);
  
  // Bad ID provided?
  if (!result) {
    this.throw(404, 'Invalid todo id');
  }
  
  // Render template
  yield this.render('edit', {todo: result});
};