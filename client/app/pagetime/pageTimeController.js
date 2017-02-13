angular.module('pagetimeChartJs',['chartJsFactory','sharkanalytics.factory'])
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
.controller('linkClickChartJsController', function($scope, Links) {
  //put this link controller here for displaying the link graph on home
  var url = [];
  var count = [];
  Links.getAllLinks()
  .then(function(res) {
    res.data.forEach(function(linkItem) {
      url.push(linkItem.url);
      count.push(linkItem.count);
    });
  });
  $scope.labels = url;
  $scope.data = count;
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
        title: {
          display: true,
          text: 'Average Time Spent on a page'
        },
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
})
.controller('CountryDemographicsController', function($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.options = {
      title: {
        display: true,
        text: 'Independent Visit per Country '
      },
      layout:{
        padding: 5
      }
    };
})
.controller('CityDemographicsController', function($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.options = {
      title: {
        display: true,
        text: 'Independent Visit per City'
      },
      layout:{
        padding: 5
      }
    };
});
