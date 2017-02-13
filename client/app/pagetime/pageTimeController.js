angular.module('pagetimeChartJs',['chartJsFactory'])
.controller('PageTimeController', function($scope, pageTimeFactory) {
  $scope.txt = 'hi there';
})
.controller('PageTimeBarController', function($scope, pageTimeFactory) {
  pageTimeFactory.getAvgPageTime(function(label, data){
    $scope.page_data = data;
    $scope.page_labels = label;
    $scope.page_options = {
      title: {
        display: true,
        text: 'Avergae Page View Time'
      },
      scales: {
        yAxes: [{
          ticks: {beginAtZero: true},
          scaleLabel: {
            display: true,
            labelString: "min"
          }
        }]
      }
    };
  });


})
.controller('PageTimeDonutController', function($scope, pageTimeFactory) {
  pageTimeFactory.getAvgPageTime(function(label, data){
    $scope.labels = label;
    $scope.data = data;
    $scope.options = {
      title: {
        display: true,
        text: 'Percentage of Time Spent on Pages'
      },
      layout:{
        padding: 5
      }
    };

  });

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
.controller('PageTimeLineController', function($scope, pageTimeFactory) {
  pageTimeFactory.getDateTimeSeries(function(label, data) {
    $scope.labels = label;
    $scope.data = data;
    $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        },
        layout:{
          padding: 5
        }
    };
  });
  // pageTimeFactory.getAvgPageTime(function(label, data, pageTimeObj) {
  //   $scope.labels = label;
  //   $scope.data = Object.values(pageTimeObj);
  //   $scope.options = {
  //       scales: {
  //         yAxes: [
  //           {
  //             id: 'y-axis-1',
  //             type: 'linear',
  //             display: true,
  //             position: 'left'
  //           }
  //         ]
  //       },
  //       layout:{
  //         padding: 5
  //       }
  //   };
  // });


  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
  // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  // $scope.options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       },
  //       {
  //         id: 'y-axis-2',
  //         type: 'linear',
  //         display: true,
  //         position: 'right'
  //       }
  //     ]
  //   },
  //   layout:{
  //     padding: 5
  //   }
  // };
});
