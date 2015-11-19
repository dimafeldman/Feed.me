//---------------------------
// Set global base
//---------------------------

global.__base = __dirname + '/';

//---------------------------
// Set global app to working
// directory for modules
//---------------------------

global.__app = __dirname + '/app/';

//---------------------------
// Initialize app
//---------------------------

require(__app + 'init')();