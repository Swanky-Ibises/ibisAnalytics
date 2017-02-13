angular.module('charJsFactory', [])
.factory('pageTimeFactory', function($http) {

  var pageTimeObj = {}; //{loc1:[timediff1,timediff2], loc2:[td1,td2,td3]..}
  var dateTimeObj = {}; //{date1:[time1,time2], date2:[td1,td2,td3]..}

  //retrieve the pageTime data from DB
  var getPageTimeData = function() {
    return $http({
      method: 'GET',
      url: '/localhost/pageTime' //hardcode domain name for now
    })
    .then(function (response) {
      console.log('response',response.data.timesArray);
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
    getPageTimeData().then(function(timesArray){
      for (var obj of timesArray){
        dateTimeObj[obj.date] = dateTimeObj[obj.date]||[];
        dateTimeObj[obj.date].push(obj.timeDifference/1000/60);
      }
      var date_labels = Object.keys(dateTimeObj);
      date_data = getArrAvg(Object.values(dateTimeObj));
      callback(date_labels, date_data, dateTimeObj);
      console.log('page_labels, page_data',date_labels, date_data);
    });

  };



  //return methods in obj
  return {
    getPageTimeData: getPageTimeData,
    getArrAvg: getArrAvg,
    getAvgPageTime: getAvgPageTime,
    getDateTimeSeries: getDateTimeSeries
  };
});










