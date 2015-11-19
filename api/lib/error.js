// Error middleware
module.exports = function error()
{
	// Return generator function
	return function *error(next)
	{
		try {
			yield next;
		} catch (err) {
			// Set response status & body
			this.status = err.status;
			this.body = {code: err.status, message: err.message};
		
			// Emit app-wide error
			this.app.emit('error', err, this);
		}
	}
};