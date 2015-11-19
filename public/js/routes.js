exports.set = function(app) {
	app.config(function($routeProvider, $sceDelegateProvider, $locationProvider) {
		console.log('init routes');
		$routeProvider.
			when('/', {
				templateUrl: 'main.html',
				controller: 'main'
			}).
			when('/page2', {
				templateUrl: 'page2.html',
			}).
			otherwise({
				redirectTo: '/'
			});

		$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('.*')]);
		//$locationProvider.hashPrefix('!');
		//$locationProvider.html5Mode(true);
	});
}