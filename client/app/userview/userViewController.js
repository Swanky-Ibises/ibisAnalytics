angular.module("sharkanalytics.userView", [])

.controller("userViewController", function($scope, Users) {

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

  $scope.getUser = function(page) {
    Pages.getPage(page).then(function (res, err) {
      if (err) {
        console.log('$scope.getUsers error:' + err);
        throw err;
      } else {
        //TO_DO: Define data to be grabbed for displaying
        return;
      }
    })
  }

  var allUsers = 0;

  $scope.getAllUsers = function () {
    Users.getAllUsers() //Defined from factory.js
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