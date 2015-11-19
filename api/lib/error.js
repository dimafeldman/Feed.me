// Error middleware
module.exports = function error()
{
	// Return generator function
	return function *error(next)
	{
		try
		{
			// Execute other middlewares
			yield next;
		}
		catch (err)
		{
			// Default status and message
			err.status = err.status || 500;
			err.message = err.message || "Internal Server Error";
			
			// Set response status & body
			this.status = err.status;
			this.body = {code: err.status, message: err.message, stack: err.stack};
		
			// Emit app-wide error
			this.app.emit('error', err, this);
		}
	}
};