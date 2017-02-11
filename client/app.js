angular.module('sharkanalytics',
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

.config(function ($routeProvider, $httpProvider) {
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
