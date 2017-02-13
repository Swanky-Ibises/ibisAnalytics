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
        text: 'Avergae Page View Time',
        fontColor: '#00ffff'
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
        text: 'Percentage of Time Spent on Pages',
        fontColor: '#00ffff'
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
      text: 'Percentage of Clicks on Each Link',
      fontColor: '#00ffff'
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
          text: 'Average Time Spent on a page',
          fontColor: '#00ffff'
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
.controller('CountryDemographicsController', function($scope, demographicsFactory) {
    demographicsFactory.getCountry(function(labels, data) {
      $scope.labels = labels;
      $scope.data = data;

      $scope.options = {
        title: {
          display: true,
          text: 'Independent Visit per Country ',
          fontColor: '#00ffff'
        },
        layout:{
          padding: 5
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            },
            scaleLabel: {
              display: true,
              labelString: "visits"
            },
            barThickness: 10
          }]
        }
      };
    });
})
.controller('CityDemographicsController', function($scope, demographicsFactory) {
  demographicsFactory.getCity(function(label, data) {
    $scope.labels = label;
    $scope.data = data;
    $scope.options = {
      title: {
        display: true,
        text: 'Independent Visit per City',
        fontColor: '#00ffff'
      },
      layout:{
        padding: 5
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: "visits"
          },
          barThickness: 10
        }]
      }
    };
  });
});
