var modelGetter = require('/js/model-getter');


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
        
        modelGetter.add_deal($http, $scope.deal,
            function(res) 
            {
                $scope.loading = false;
            
                alert("Deal saved successfully!");
                $location.path('/'); 
            },
            function(err)
            {
                alert(err.message);
                
                $scope.loading = false;        
            });
        
    }
});


app.controller('main', function($scope, $http, $route, $mdDialog) {
    console.log('main');

    modelGetter.get_deals($http,
        function(data) {
            $scope.deals = data.deals;
        }
    );
    
    
    $scope.deleteDeal = function(deal) {
        
        modelGetter.delete_deal($http, deal,
        function(data) {
           $route.reload();
        }); 
    };

    $scope.filter = {
        timerange: {
            0: '00:00',
            1: '01:00',
            2: '02:00',
            3: '03:00',
            4: '04:00',
            5: '05:00',
            6: '06:00',
            7: '07:00',
            8: '08:00',
            9: '09:00',
            10: '10:00',
            11: '11:00',
            12: '12:00',
            13: '13:00',
            14: '14:00',
            15: '15:00',
            16: '16:00',
            17: '17:00',
            18: '18:00',
            19: '19:00',
            20: '20:00',
            21: '21:00',
            22: '22:00',
            23: '23:00',
            24: '24:00'
        }
    };

    $scope.doFilter = function() {
        var timeRange = [$scope.filter.when + ':00', (parseInt($scope.filter.when) < 24) ? parseInt($scope.filter.when) + 1 + ':00' : '1:00'];

        var query = { text: $scope.filter.what,
                  time_range: timeRange
            };
        if($scope.filter.where)
        {
            query.location = { address: $scope.filter.where,
                               radius: 3
                     };
        }
        
        modelGetter.search($http, query,
            function(data) 
            {
                $scope.deals = data.deals;
            }
        );
    };

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

    $scope.feedMe = function(deal)
    {
        deal.interested++;
        $mdDialog.show({
            templateUrl: './feedme-modal.html',
            controller: 'dealModal',
            parent: angular.element(document.body),
            locals: {
            deal: deal },
            clickOutsideToClose: true
        });
    }
    
    //$scope.openDealModal('1');
});

app.controller('dealModal', function($scope, $mdDialog, $http, $route, $location, $timeout, deal) {
    $scope.deal = deal;
    
    
    $scope.feedMe = function(deal)
    {
        deal.interested++;
        
        $timeout(function(){
            $mdDialog.show({
                templateUrl: './feedme-modal.html',
                controller: 'dealModal',
                parent: angular.element(document.body),
                locals: {
                deal: deal },
                clickOutsideToClose: true
            });
        }, 1000)
    }
    
    $scope.navigate = function(deal)
    {
        window.location = "http://maps.google.com/?q=" + encodeURIComponent(deal.address);
    }

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
app.controller('search', function($scope, $mdDialog, $http) {

});

app.controller('gMap', function($scope, $http, $mdDialog, uiGmapGoogleMapApi) {

    $('.angular-google-map-container').css('height', window.innerHeight - 150);

    var showOnMap = function(deals) {
        var dealMarkers = [];

        _.each(deals, function(deal, i) {
            dealMarkers.push({
                id: deal._id,
                latitude: deal.location[0],
                longitude: deal.location[1],
                icon: '/img/foodicon.png',
                options: {
                    doRebuildAll: true
                }
            })
        });

        var centerMap    = {latitude: 32.066838, longitude: 34.787784};
        var fakeLocation = {latitude: 32.066838, longitude: 34.787784};

        uiGmapGoogleMapApi.then(function(maps) {

            $scope.map = {
                center: centerMap,
                zoom: 16
            };

            $scope.selfMarker = {
                id: 0,
                coords: fakeLocation,
                options: {icon: '/img/myicon.png'}
            };

            $scope.dealMarkers = dealMarkers;
        });

    };

    $scope.filter = {
        timerange: {
            0: '00:00',
            1: '01:00',
            2: '02:00',
            3: '03:00',
            4: '04:00',
            5: '05:00',
            6: '06:00',
            7: '07:00',
            8: '08:00',
            9: '09:00',
            10: '10:00',
            11: '11:00',
            12: '12:00',
            13: '13:00',
            14: '14:00',
            15: '15:00',
            16: '16:00',
            17: '17:00',
            18: '18:00',
            19: '19:00',
            20: '20:00',
            21: '21:00',
            22: '22:00',
            23: '23:00',
            24: '24:00'
        }
    };

    $scope.doFilter = function() {
        var timeRange = [$scope.filter.when + ':00', (parseInt($scope.filter.when) < 24) ? parseInt($scope.filter.when) + 1 + ':00' : '1:00'];
        
        
        var query = { text: $scope.filter.what,
                      time_range: timeRange
                 };
        if($scope.filter.where)
        {
            query.location = { address: $scope.filter.where,
                               radius: 3
                     };
        }
        modelGetter.search($http, query,
            function(data) {
                showOnMap(data.deals);
            }
        );
    };


    modelGetter.get_deals($http,
        function(data) {
                showOnMap(data.deals);
            }
    );
    
});

app.controller('AppController', function($mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

});