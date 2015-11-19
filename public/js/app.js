var app = angular.module('myApp', [
  	'ngRoute',
	'ngCookies',
	'ngMaterial',
	'ngAnimate',
	'satellizer',
	'ngStorage',
	'uiGmapgoogle-maps'
]);
app.name = 'FeedMe';

require('/js/routes.js').set(app);

app.data = {};

app.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyC-0nA_KIGnQPmKEIC9RssIhVvr8_xkqwE',
		v: '3.20',
		libraries: 'weather,geometry,visualization'
	});
});

app.controller('layout', function ($scope, $rootScope, $location, page, utils, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog) {
	console.log('LayoutCtrl');


});

app.controller('main', function($scope, $http, uiGmapGoogleMapApi) {

	$http.get('/getData')
		.success(function (data) {
			console.log('browse: success, app:', data);
		}
	);

	// init google maps
	uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
	});
});

app.controller('gMap', function($scope, $http, uiGmapGoogleMapApi) {

    /*$http.get('/getData')
        .success(function(data) {
            console.log('browse: success, app:', data);
        }
    );*/

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            uiGmapGoogleMapApi.then(function(maps) {
                $scope.map = {
                    //center: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    center: {latitude: 32.066838, longitude: 34.787784},
                    markerSelf: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 16
                };
                $scope.selfMarker = {
                    id: 0,
                    //coords: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    coords: {latitude: 32.066838, longitude: 34.787784},
                    options: {draggable: true}
                };
            });
        });
    } else {
        alert('GEO location is not allowed in your browser.');
    }
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