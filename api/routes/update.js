// Require todo model
var Todo = require('../models/todo');

module.exports = function *() {
  // Get request body
  var input = this.request.body;
  
  // Update todo item with given input ID
  yield Todo.update( {_id: input.id}, {
    name: input.name,
    description: input.description,
    created_on: new Date(input.created_on),
    updated_on: new Date()});
    
  // Redirect to index
  this.redirect('/');
};