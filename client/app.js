angular
.module('sharkanalytics',
  ['sharkanalytics.pageView',
  'sharkanalytics.linkClick',
  'sharkanalytics.factory',
  'sharkanalyticss.linkClickPlotly',
  'sharkanalytics.pageViewPlotly',
  'ngRoute',
  'angular-jwt',
  'auth0',
  'angular-storage',
  'ui.router'
  ])

.config(function ($routeProvider, $httpProvider, authProvider) {

  console.log(authProvider)
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
    .otherwise({
      redirectTo: '/'
    })
  })

.controller('navbarController', function($scope, auth, store){
  $scope.login = function(){
    console.log(auth);
    console.log(store);
    auth.signin({}, 
      function(profile, token){
        store.set("profile", profile);
        store.set("webToken", token);
      },
      function(err){
        console.log(err);
      }
    );
  }
});
