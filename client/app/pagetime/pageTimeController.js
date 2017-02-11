angular.module('pagetimeChartJs',[])
.controller('PageTimeController', function($scope) {
  $scope.txt = 'hi there';
})
.controller('PageTimeBarController', function($scope) {
  $scope.msg = 'oh oh..';
  $scope.txt = 'scope overlap?';
  $scope.page_labels = ['Home','Product','Checkout','Others'];
  $scope.page_series = ['Page View Time'];
  $scope.page_colours = '#087D76';
  $scope.page_data = [['1', '5', '2', '0']];
});