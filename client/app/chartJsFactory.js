angular.module('chartJsFactory', [])
.factory('pageTimeFactory', function($http, $rootScope) {

  var pageTimeObj = {}; //{loc1:[timediff1,timediff2], loc2:[td1,td2,td3]..}
  var dateTimeObj = {}; //{date1:[time1,time2], date2:[td1,td2,td3]..}

  //retrieve the pageTime data from DB
  var getPageTimeData = function() {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/pageTime'
    })
    .then(function (response) {
      // console.log('response',response.data.timesArray);
      return response.data.timesArray;
    });
  };

  var getAvg = function(arr) {
    return arr.reduce(function(pre,cur){
      return pre+cur;
    })/arr.length;
  };

  var getArrAvg = function(arrays){
    var a = [];
    for (var array of arrays) {
      a.push(getAvg(array));
    }
    return a;
  };

  var getAvgPageTime = function(callback) {
    var page_labels = null;
    var page_data = null;
    getPageTimeData().then(function(timesArray){
      for (var obj of timesArray){
        pageTimeObj[obj.location] = pageTimeObj[obj.location]||[];
        pageTimeObj[obj.location].push(obj.timeDifference/1000/60);
      }
      page_labels = Object.keys(pageTimeObj);
      page_data = getArrAvg(Object.values(pageTimeObj));
      callback(page_labels, page_data, pageTimeObj);
    });
  };

  var getDateTimeSeries = function(callback){
    var dateHour = null;
    var date_labels = null;
    var date_data = null;
    getPageTimeData().then(function(timesArray){
      for (var obj of timesArray){
        //for the x-axis time display, improve to use time scale
        //http://www.chartjs.org/docs/#scales-time-scale
        dateHour = _formatDate(obj.date)[0];
        dateTimeObj[dateHour] = dateTimeObj[dateHour]||[];
        dateTimeObj[dateHour].push(obj.timeDifference/1000/60);
      }
      date_labels = Object.keys(dateTimeObj);
      date_data = getArrAvg(Object.values(dateTimeObj));
      callback(date_labels, date_data, dateTimeObj);
    });

  };

  function _formatDate(str) {
    var regex = /(?:.)-(.*?)T(.*?):(?:)/gi;
    var match = regex.exec(str);
    var dateHour = match[1]+ ' ' +match[2]+'00'; //match[1] is date
    return [dateHour, match[1]];
  }


  //return methods in obj
  return {
    getPageTimeData: getPageTimeData,
    getArrAvg: getArrAvg,
    getAvgPageTime: getAvgPageTime,
    getDateTimeSeries: getDateTimeSeries
  };
})
.factory('demographicsFactory', function($http, $rootScope) {
  var _getDemographicsData = function() {
    return $http({
      method: 'GET',
      url: $rootScope.domainName + '/addresses'
    })
    .then(function (response) {
      console.log('response',response.data);
      return response.data;
    });
  };

  var getCountry = function(callback) {
    var countryObj = {};
    _getDemographicsData().then(function(data) {
      data.forEach(function(visit) {
        countryObj[visit.country] = countryObj[visit.country] || 0;
        countryObj[visit.country]++;
      });
      console.log(countryObj);
      var labels = Object.keys(countryObj);
      var demogData = Object.values(countryObj);
      callback(labels, demogData);
    });
  };

  var getCity = function(callback) {
    var cityObj = {};
    _getDemographicsData().then(function(data) {
      data.forEach(function(visit) {
        cityObj[visit.city] = cityObj[visit.city] || 0;
        cityObj[visit.city]++;
      });
      console.log(cityObj);
      var labels = Object.keys(cityObj);
      var demogData = Object.values(cityObj);
      callback(labels, demogData);
    });
  };

  return {
    getCountry:getCountry,
    getCity:getCity
  };

});










