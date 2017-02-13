angular.module('sharkanalytics.factory', [])

/* LINKS FACTORY */
.factory('Links', function ($http, $rootScope) {

  //should get all links from database
  var getAllLinks = function () {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/linkClickAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getLink = function (url) {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/linkClick',
      params: {url: url}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllLinks: getAllLinks,
    getLink: getLink
  };
})


/* PAGES FACTORY */
.factory('Pages', function ($http, $rootScope) {

  //should get all links from database
  var getAllPages = function () {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/pageViewAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getPage = function (title) {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/pageView',
      params: {title: title}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllPages: getAllPages,
    getPage: getPage
  };
});