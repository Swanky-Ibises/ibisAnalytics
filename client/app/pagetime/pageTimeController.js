angular.module('pagetimeChartJs',[])
.controller('PageTimeController', function($scope) {
  $scope.txt = 'hi there';
})
.controller('PageTimeBarController', function($scope) {
  // $scope.msg = 'oh oh..';
  // $scope.txt = 'scope overlap?';
  $scope.page_labels = ['Home','Product','Checkout','Others'];
  $scope.page_series = ['Page View Time'];
  //$scope.page_colours = '#087D76';
  $scope.page_data = [['1', '5', '2', '7']];
  $scope.page_options = {
    title: {
      display: true,
      text: 'Most Commonly Viewed Pages'
    },
    scales: {
      yAxes: [{
        ticks: {beginAtZero: true}
      }]
    }
  };
})
.controller('PageTimeDonutController', function($scope) {
  $scope.labels = ['Home','Product','Checkout','Others'];
  $scope.data = [300, 500, 100, 200];
  $scope.options = {
    title: {
      display: true,
      text: 'Percentage of Time Spent on Pages'
    },
    layout:{
      padding: 5
    }
  };
})
.controller('linkClickChartJsController', function($scope) {
  //put this link controller here for displaying the link graph on home
  $scope.labels = ['Home','Product','Checkout','Others'];
  $scope.data = [300, 500, 100, 200];
  $scope.options = {
    title: {
      display: true,
      text: 'Percentage of Clicks on Each Link'
    },
    layout:{
      padding: 5
    }
  };
})
.controller('PageTimeLineController', function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    },
    layout:{
      padding: 5
    }
  };
});
