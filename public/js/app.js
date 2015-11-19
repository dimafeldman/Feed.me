var app = angular.module('myApp', [
  	'ngRoute',
	'ngCookies',
	'ngMaterial',
	'ngAnimate',
	'satellizer',
	'ngStorage'
]);
app.name = 'FeedMe';

require('/js/routes.js').set(app);

app.data = {};
app.data.deals = [];

app.newSubscriber = function(userId, username) {
	return {
		userId: userId,
		name: username,		
	}
}
app.newDeal = function() {
	return {
		title: 'שאריות של פלאפל שלומי',
		price: '10',
		image: '/img/shchuna-falafel-closeup.jpg',
		location: 'תל אביב, המסגר 35',
		discount: '80%',
		description: 'פלאפל טעים טעים',
		quantity: 10,
		created: Date.now(),
		// new
		subscribers: [app.newSubscriber('1', 'Shlomi'), app.newSubscriber('2', 'Kobi')],
	}
} 

app.controller('layout', function ($scope, $rootScope, $location, page, utils, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog) {
	console.log('LayoutCtrl');


});

app.controller('main', function($scope, $http) {
	console.log('main');
	
	$scope.deals = [app.newDeal(), 
					{title: 'פיצה פצץ',
					price: '0',
					image: '/img/pizza.jpg',
					location: 'תל אביב, ,תושיה 2',
					discount: '100%',
					description: 'שאריות האקתון',
					quantity: 10,
					created: Date.now(),
					// new
					subscribers: [app.newSubscriber('1', 'Barak')]}
					
					]; 
	
	/*
	$http.get('/getData')
		.success(function (data) {
			console.log('browse: success, app:', data);
		}
	);
	*/
});

app.controller('AppCtrl', function($scope) {
		var imagePath = 'img/list/60.jpeg';
		$scope.providers  = [
			{
				image: imagePath,
				name: 'Awesome restaurant',
				description: " I'll be in your neighborhood doing errands",
			},
			{
				image: imagePath,
				name: 'Awesome restaurant',
				description: " I'll be in your neighborhood doing errands"
			},
			{
				image: imagePath,
				name: 'Awesome restaurant',
				description: " I'll be in your neighborhood doing errands"
			}
		];
	});

app.controller('AppController', function($mdSidenav) {
	var vm = this;

	vm.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

});