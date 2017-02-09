angular.module('sharkanalytics.factory', [])

/* LINKS FACTORY */
.factory('Links', function ($http) {

  //should get all links from database
  var getAllLinks = function () {
    return $http({
      method: 'GET',
      url: '/linkClickAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getLink = function (url) {
    return $http({
      method: 'GET',
      url: '/linkClick',
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
.factory('Pages', function ($http) {

  //should get all pages from database
  var getAllPages = function () {
    return $http({
      method: 'GET',
      url: '/pageViewAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified pages from database
  var getPage = function (title) {
    return $http({
      method: 'GET',
      url: '/pageView',
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
})

/* USERS FACTORY */
.factory('Users', function ($http) {

  //should get all sessions from database
  var getAllSessions = function () {
    return $http({
      method: 'GET',
      url: '/allSessions'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified sessions from database
  var getSession = function (user) {
    return $http({
      method: 'GET',
      url: '/sessions',
      params: {title: title}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllSessions: getAllSessions,
    getSession: getSession
  };
});