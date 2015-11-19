// Require todo model
var Todo = require('../models/todo');

module.exports = function *(id) 
{
  // Find todo by ID
  var result = yield Todo.findById(id);
  
  // No such todo?
  if (!result) {
    this.throw(404, 'Invalid todo ID');
  }
  
  // Render in template
  yield this.render('show', {todo: result});
};