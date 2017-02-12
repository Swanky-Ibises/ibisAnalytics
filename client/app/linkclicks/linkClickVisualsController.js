angular.module('sharkanalyticss.linkClickPlotly', [])

.controller('linkClickVisualsController', function ($scope, Links) { // our bar graph controller

  var allUrls = []; // initialization block
  var allCounts = [];

  $scope.refresh = function() { // When refresh is called:
    Links.getAllLinks() // Get all the links
      .then(function(response) {
        response.data.forEach(function(item) { // For all items in response.data...
          allUrls.push(item.url); // Push the url and the count properties onto their relevant arrays.
          allCounts.push(item.count);
        })
        $scope.data = {
        x: allUrls,
        y: allCounts,
        type: 'bar'
        }; // Set our bar graph parameters within an object...
        $scope.data = [$scope.data]; // and store it-as Plotly requires-within an array.
      });
  };

  $scope.refresh();
})

.controller("linkClickPieController", function ($scope, Links) { // our pie graph controller

  var allUrls = []; // initialization block
  var allCounts = [];
  var percentage = [];
  var totalCount = 0;

  $scope.refresh = function() { // When refresh is called:
    Links.getAllLinks() // Get all the links
      .then(function(response) {
        response.data.forEach(function(item) { // For all the items in response.data...
          totalCount+=item.count; // Increment the total amount of clicks by the amount of times the current url has been clicked
          allUrls.push(item.url); // Push the url and count properties into their relevant arrays.
          allCounts.push(item.count);
        })
        allCounts.forEach(function(count) { // For each link...
          percentage.push(count/totalCount*100) // Get the percentage of how many times this link has been clicked over the total number of aggregate clicks.
        })
        $scope.data = {values: percentage, labels: allUrls, type: 'pie'}; // Set our pie graph
        $scope.data = [$scope.data];
      });
  };



  $scope.refresh();

})

.controller("linkClickDayController", function ($scope, Links) { // our day graph controller

  var allUrls = []; // initialization block
  var allDates = [];
  var everyDay = [];
  var dates = {};

  $scope.refresh = function() { // When refresh is called:
    Links.getAllLinks() // Get all the links.
      .then(function(response) {
        response.data.forEach(function(item) { // For each element within the data...
          item.date.forEach(function(element) { // For each date within the element...
            allDates.push(element); // Push date onto allDates
          });
        });
        allDates.forEach(function(day) { // For each day within allDates...
          var day = day.slice(4,10); // Slice off the relevant substring: for example, "Feb 06"
          if(dates[day]) { // If we already have an entry for this day within dates...
            dates[day] = dates[day] + 1; // Increment the count for this date.
          } else { // If not, instantiate it to one.
            dates[day] = 1;
          }
        });
        var days = Object.keys(dates);
        for (var key in dates) {
          everyDay.push(dates[key]); // Push the date "counts" into everyDay for plotting.
        }
        $scope.data = {x: days, y: everyDay, type: 'scatter'}; // Our scatter plot.
        $scope.data = [$scope.data];
      });
  };

  $scope.refresh();

})

// .controller('linkClickLineController', function ($scope, Links) {

//   var allUrls = [];
//   var allCounts = [];

//   $scope.refresh = function() {
//     Links.getAllLinks()
//     .then(function(response) {
//       response.data.forEach(function(item) {
//         allUrls.push(item.url);
//         allCounts.push(item.count);
//       })
//       allCounts.sort();
//       $scope.data = {x: allUrls, y: allCounts, type: 'line'};
//       $scope.data = [$scope.data];
//     });
//   }

//   $scope.refresh();
// })

.directive('linePlot', function () {
  // Create a link function
  function linkFunc(scope, element, attrs) {
      scope.$watch('data', function (plots) {
        var layout = {
          width: attrs.width,
          height: attrs.height,
          //margin: { 't': 40, 'b':20, 'l':40, 'r':0 },
        };

      Plotly.newPlot(element[0], plots, layout);
    }, true);
  }

  // Return this function for linking ...
  return {
      link: linkFunc
  };

})

.directive('overallPlot', function () {
  // Create a link function
  function linkFunc(scope, element, attrs) {
      scope.$watch('data', function (plots) {
        var layout = {
          width: 400,
          height: 200,
          margin: { 't': 40, 'b':20, 'l':40, 'r':0 },
        };

      Plotly.newPlot(element[0], plots, layout);
    }, true);
  }

  // Return this function for linking ...
  return {
      link: linkFunc
  };

});
