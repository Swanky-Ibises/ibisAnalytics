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

  //should get all links from database
  var getAllPages = function () {
    return $http({
      method: 'GET',
      url: '/pageViewAll'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
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

  //should get all links from database
  var getAllUsers = function () {
    return $http({
      method: 'GET',
      url: '/allUsers'
    })
    .then(function (response) {
      return response;
    });
  };

  //should get a specified link from database
  var getUser = function (user) {
    return $http({
      method: 'GET',
      url: '/user',
      params: {title: title}
    })
    .then(function (response) {
      return response;
    });
  };

  return {
    getAllUsers: getAllUsers,
    getUser: getUser
  };
});