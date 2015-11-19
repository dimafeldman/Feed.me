// Require todo model
var Todo = require('../models/todo');

module.exports = function *() {
  // Parse input from request body
  var input = this.request.body;
  
  // Get current date
  var creationDate = new Date();
  
  // Create new todo Mongoose model
  var todo = new Todo();
  
  // Set properties
  todo.name = input.name;
  todo.description = input.description;
  todo.created_on = creationDate;
  todo.updated_on = creationDate;
  
  // Save in collection
  yield todo.save();
  
  // Redirect to index
  this.redirect('/');
};