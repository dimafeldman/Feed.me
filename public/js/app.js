var app = angular.module('myApp', [
  	'ngRoute',
	'ngCookies',
	'myAppServices',
	'ngMaterial',
	'ngAnimate',
	'satellizer',
	'ngStorage',
]);
app.name = 'FeedMe';

app.controller('layout', function ($scope, $rootScope, $location, page, utils, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog) {
	console.log('LayoutCtrl');


});

app.controller('main', function($scope, $http) {
	console.log('main');
	$http.get('/getData')
		.success(function (data) {
			console.log('browse: success, app:', data);
		}
	);
});

app.controller('AppController', function($mdSidenav) {
	var vm = this;

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

});