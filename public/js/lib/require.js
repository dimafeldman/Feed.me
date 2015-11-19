// ==Closure.compiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/Closure.compiler==

// Require() 0.3.4 unstable
//
// Copyright 2012 Torben Schulz <http://pixelsvsbytes.com/>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
// 
///////////////////////////////////////////////////////////////////////

(function() {
// NOTE If we would use strict mode for this closure we won't allow the modules
//      to be executed in normal mode.

if (window.require !== undefined)
	throw 'RequireException: \'require\' already defined in global scope';


window.require = function(module, callback) {
	var url = window.require.resolve(module);

	if (require.cache[url]) {
		// NOTE The callback should always be called asynchronously
		callback && setTimeout(function(){callback(require.cache[url])}, 0);
		return require.cache[url];
	}
	
	var exports = new Object();
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState != 4)
			return;
		if (this.status != 200)
			throw 'Require() exception: GET '+url+' '+this.status+' ('+this.statusText+')';


		if (window.require.cache[url]) {
			exports = window.require.cache[url];
		}
		else if (this.getResponseHeader('content-type').indexOf('application/json') != -1) { 
			exports = JSON.parse(this.responseText);
			window.require.cache[url] = exports;
		}
		else {
			window.require.cache[url] = exports;
			var source = this.responseText.match(/^\s*(?:(['"]use strict['"])(?:;\r?\n?|\r?\n))?\s*((?:.*\r?\n?)*)/);
			eval('(function(){'+source[1]+';var exports=window.require.cache[\''+url+'\'];\n\n'+source[2]+'\n})();\n//@ sourceURL='+url+'\n');
		}

		callback && callback(window.require.cache[url]);
	};
	request.open('GET', url, !!callback);
	request.send();
	return exports;
}

window.require.resolve = function(module) {
	var r = module.match(/^(\.{0,2}\/)?([^\.]*)(\..*)?$/);
	return (r[1]?r[1]:'/js_modules/')+r[2]+(r[3]?r[3]:(r[2].match(/\/$/)?'index.js':'.js'));
}

// INFO initializing module cache
window.require.cache = new Object();
})();
