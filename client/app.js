angular.module('sharkanalytics',
  ["chart.js",'sharkanalytics.pageView',

  'sharkanalytics.linkClick',
  'sharkanalytics.factory',
  'sharkanalyticss.linkClickPlotly',
  'sharkanalytics.pageViewPlotly',
  'pagetimeChartJs',
  'ngRoute',
  'angular-jwt',
  'auth0',
  'angular-storage',
  'ui.router'
  ])
.config(function ($routeProvider, $httpProvider, authProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('');
  console.log(authProvider);
  authProvider.init({
    domain: 'swanky-ibises.auth0.com',
    clientID: '9ZbTuQ2rS1kaqKXEDq3oBaRuOAGldqvQ'
  });
  $routeProvider
    .when('/pageView', {
      templateUrl: 'app/pageview/pageView.html',
      controller: 'pageViewController'
    })
    .when('/linkClick', {
      templateUrl: 'app/linkclicks/linkClick.html',
      controller: 'linkClickController'
    })
    .when('/overall', {
      templateUrl: 'app/overall/overall.html',
      controller: 'linkClickVisualsController'
    })
    .when('/overview', {
      templateUrl: 'app/overall/overview.html',
      controller: 'PageTimeController'
    })
    .when('/', {
      templateUrl: 'app/overall/homepage.html',
      controller: ''
    })
    .otherwise({
      redirectTo: '/'
    });
  })

.controller('navbarController', function($scope, auth, store, $location){
  
  $scope.login = function() {
    console.log(auth);
    console.log(store);
    auth.signin({},
      function(profile, token) {
        store.set("profile", profile);
        store.set("webToken", token);
        $location.path('/');
        $scope.logged = auth.isAuthenticated;
      },
      function(err){
        console.log(err);
      }
    );
  };

  $scope.logout = function() {
    store.remove('profile');
    store.remove('webToken');
    auth.signout();
    $scope.logged = auth.isAuthenticated;
    $location.path('/');
  }
});


