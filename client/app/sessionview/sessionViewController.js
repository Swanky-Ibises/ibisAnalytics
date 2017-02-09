angular.module("sharkanalytics.sessionView", [])

.controller("sessionViewController", function($scope, Sessions) {

  $scope.pageProperties = {};
  $scope.showAll = true;
  $scope.hideAll = false;

  $scope.setShowAll = function(boolean) {
    $scope.showAll = boolean;
    $scope.hideAll = !boolean;
  }

  $scope.showDates = true;
  $scope.hideDates = false;

  $scope.setHideDates = function(boolean) {
    $scope.hideDates = boolean;
    $scope.showDates = !boolean;
  }

  $scope.getSession = function(session) {
    Session.getSession(session).then(function (res, err) {
      if (err) {
        console.log('$scope.getSession error:' + err);
        throw err;
      } else {
        //TO_DO: Define data to be grabbed for displaying
        return;
      }
    })
  }

  var allSession = 0;

  $scope.getAllSessions = function () {
    Sessions.getAllSessions() //Defined from factory.js
      .then (function (res, err) {
        if(err) {
          console.log('$scope.getAllUsers error:' + err);
          throw err;
        } else {
          //TO_DO: Define data to be grabbed for displaying
          return;
        }
      })
    }
});