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
  ])
.config(function ($routeProvider, $httpProvider, authProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('');
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

.controller('headerController', function($scope, auth, store, $location, $rootScope){
  
  $scope.login = function() {
    auth.signin({},
      function(profile, token) {
        store.set("profile", profile);
        store.set("webToken", token);
        $location.path('/overview');
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
    $location.path('/');
  }
})

.run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on("$locationChangeStart", function() {

    var token = store.get("webToken");
    if(token) {
      if(!jwtHelper.isTokenExpired(token)) {
        if(!auth.isAuthenticated) {
          auth.authenticate(store.get("profile"), token);
        }
      }
    } else {
      $location.path('/');
    }
  })
});


