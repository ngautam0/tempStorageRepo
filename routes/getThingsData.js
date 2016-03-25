var request = require('request');
var Promise = require("Q");

module.exports=function getThingsData(thingKey,authToken){
  var deferred = Promise.defer();
  console.log("in get things data");
  console.log(thingKey);
  console.log(authToken);
  var thingRequestUrl="https://api.datonis.io/api/v3/things/"+thingKey
  console.log(thingRequestUrl);
  request({
      uri: thingRequestUrl,
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token':authToken
      }
  }, function(error, response, body) {
      console.log("request returned");
      console.log(body);
      var objectContainingAllDataForSingleThing = JSON.parse(body);
      console.log(objectContainingAllDataForSingleThing);
      deferred.resolve(objectContainingAllDataForSingleThing);
  });
  return deferred.promise;
}
