var app  = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'ngMaterial',
    'ngAnimate',
    'uiGmapgoogle-maps'
]);
app.name = 'FeedMe';

require('/js/routes.js').set(app);

app.data       = {};
app.data.deals = [];

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC-0nA_KIGnQPmKEIC9RssIhVvr8_xkqwE',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
});

app.newSubscriber = function(userId, username) {
    return {
        userId: userId,
        name: username
    }
};

app.controller('layout', function($scope, $rootScope, $location, page, utils, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog) {
    console.log('LayoutCtrl');


});

app.controller('add', function($scope, $http, $location, $mdDialog) {
    
    // Default deal
    $scope.deal = {'seller': 'PizzaHutCorp.',
                   'title': 'Pizza', 
                   'image': '../img/pizza.jpg',
                   'description': 'Very tasty pizza with random toppings',
                   'price': '3$',
                   'address': 'Tel Aviv, Namir 20',
                   'quantity': '20',                                                                                               
                   'when' : '23:00'};
    
    // Save deal
    $scope.saveDeal = function()
    {
        $scope.loading = true;
        
        $http.put('/deals', $scope.deal)
        .success(function(res) 
        {
            $scope.loading = false;
        
            alert("Deal saved successfully!");
            $location.path('/'); 
        })
        .error(function(err)
        {
            alert(err.message);
            
            $scope.loading = false;        
        });
    }
});


app.controller('main', function($scope, $http, $route, $mdDialog) {
    console.log('main');

    $http.get('/deals')
        .success(function(data) {
            $scope.deals = data.deals;
        });
        
    $scope.deleteDeal = function(deal)
    {
        $http.delete('/deals/' + deal._id)
        .success(function(data) {
           $route.reload();
        });     
    }

    $scope.openDealModal = function(dealId) {

        $mdDialog.show({
            controller: 'dealModal',
            templateUrl: './deal-modal.html',
            locals: {
                deal: $scope.deals.filter(function(x) {
                    return x._id == dealId
                })[0]
            },
            parent: angular.element(document.body),
            clickOutsideToClose: true
        })
    };

    //$scope.openDealModal('1');
});

app.controller('dealModal', function($scope, $mdDialog, $http, $route, $location, deal) {
    $scope.deal = deal;

    $scope.openDealModal = function(dealId) {
        $mdDialog.show({
            controller: 'dealModal',
            templateUrl: './deal-modal.html',
            locals: {
                deal: $scope.deals.filter(function(x) {
                    return x.id == dealId
                })[0]
            },
            parent: angular.element(document.body),
            clickOutsideToClose: true
        })
    };
    
    $scope.hide = function () {
		$mdDialog.hide();
	};
	$scope.cancel = function () {
		console.log('cancel!');
		$mdDialog.cancel();
	};
	
});

app.controller('AppCtrl', function($scope) {
    var imagePath    = 'img/list/60.jpeg';
    $scope.providers = [
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

app.controller('gMap', function($scope, $http, $mdDialog, uiGmapGoogleMapApi) {
    var dealMarkers = [];

    $('.angular-google-map-container').css('height', window.innerHeight - 150);

    $http.get('/deals')
        .success(function(data) {
            _.each(data.deals, function(deal, i) {
                dealMarkers.push({
                    id: deal._id,
                    latitude: deal.location[0],
                    longitude: deal.location[1],
                    icon: '/img/foodicon.png'
                })
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    uiGmapGoogleMapApi.then(function(maps) {
                        $scope.map        = {
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

                        $scope.dealMarkers = dealMarkers;
                    });
                });
            } else {
                alert('GEO location is not allowed in your browser.');
            }
        }
    );
});

app.controller('AppController', function($mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

});