angular.module('sharkanalytics.pageViewPlotly', [])

.controller('pageViewVisualsController', function($scope, Pages) { // our bar graph controller

	var allTitles = []; // initialization block
	var allCounts = [];

	$scope.refresh = function() { // When refresh is called:
		Pages.getAllPages().then(function (res) { // Get all the pages
			res.data.forEach(function (element) { // For all items in response.data...
				allTitles.push(element.title); // Push the page and the count properties onto their relevant arrays.
				allCounts.push(element.count);
			});
			$scope.data = [{ // Set our bar graph parameters within an object...
				x: allTitles, // and store it-as Plotly requires-within an array.
				y: allCounts,
				type: 'bar'
			}];
		});
	};
	$scope.refresh();
})

.controller("pageViewPieController", function ($scope, Pages) { // our pie graph controller

  var allTitles = []; // initialization block
  var allCounts = [];
  var percentage = [];
  var totalCount = 0;

  $scope.refresh = function() { // When refresh is called:
    Pages.getAllPages() // Get all the pages
      .then(function(response) {
        response.data.forEach(function(item) { // For all the items in response.data...
          totalCount+=item.count; // Increment the total amount of clicks by the amount of times the current page has been clicked
          allTitles.push(item.title);
          allCounts.push(item.count);
        });
        allCounts.forEach(function(count) { // For each page...
          percentage.push(count/totalCount*100); // Get the percentage of how many times this page has been clicked over the total number of aggregate clicks.
        });
        $scope.data = {values: percentage, labels: allTitles, type: 'pie'};
        $scope.data = [$scope.data];
      });
  };

  $scope.refresh();

})

.controller('pageViewDayController', function($scope, Pages) {

  var allTitles = []; // initialization block
  var allDates = [];
  var everyDay = [];
  var dates = {};

  $scope.refresh = function() {
    Pages.getAllPages().then(function(res) { // get all pages...
      res.data.forEach(function (element) { // for each element in the data object...
        element.date.forEach(function (specificElement) { // for each item in the element...
          allDates.push(specificElement); // push onto the array
        });
    });
    allDates.forEach(function (day) {
      var day = day.slice(4, 10); // Get the relevant substring: for example, "Feb 06"
      if(dates[day]) {
        dates[day] = dates[day] + 1;
      } else {
        dates[day] = 1; // if dates[day] exists, increment it, if not, initialize it to 1
      }
    });
    var days = Object.keys(dates); // get the days
    for (var key in dates) {
      everyDay.push(dates[key]); // push each individual date onto everyDays
    }
    $scope.data = {x: days, y: everyDay, type: 'scatter'};
    $scope.data = [$scope.data];
  });

  };

  $scope.refresh();

})


.directive('linePlot', function () {
  // Create a page function
  function pageFunc(scope, element, attrs) {
      scope.$watch('data', function (plots) {
        var layout = {
          width: attrs.width,
          height: attrs.height,
          margin: { 't': 40, 'b':20, 'l':40, 'r':0 },
        };

      Plotly.newPlot(element[0], plots, layout);
    }, true);
  }

  // Return this function for linking ...
  return {
      page: pageFunc
  };

})

.directive('overallPlot', function () {
  // Create a page function
  function pageFunc(scope, element, attrs) {
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
      page: pageFunc
  };

})
