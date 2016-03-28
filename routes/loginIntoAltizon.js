var express = require('express');
var router = express.Router();
var request = require('request');
var Promise = require("Q");
var getThingsData=require("./getThingsData");
var passport = require('passport');
/* GET home page. */
router.post('/',passport.authenticate('local'), function(req, res, next) {
  res.redirect('/')
    // console.log("in loginIntoAltizon");
    // console.log(req.body.user);
    // console.log(req.body.password);
    //
    // var objectToBeSentBack={};
    //
    // request({
    //     uri: "https://api.datonis.io/api_sign_in",
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     formData: {
    //         "email": req.body.user,
    //         "password": req.body.password
    //     }
    // }, function(error, response, body) {
    //     console.log(body);
    //     var obj = JSON.parse(body);
    //     if (obj.auth_token !== undefined) {
    //         console.log(obj.auth_token);
    //
    //         processAuthTokenAndGetDashboardData(obj.auth_token).
    //           then(function(objectContainingAllThings){
    //
    //             console.log(objectContainingAllThings);
    //             console.log(objectContainingAllThings["things"][0]["thing_key"]);
    //             var objectContainingAllDataForSingleThing=
    //             getThingsData(objectContainingAllThings["things"][0]["thing_key"],obj.auth_token).
    //               then(function(objectContainingAllDataForSingleThing){
    //                 console.log("@line 38",objectContainingAllDataForSingleThing);
    //                 res.send(objectContainingAllThings);
    //               });
    //           });
    //     } else if (obj.errors !== undefined) {
    //       objectToBeSentBack["error"]="Log In Un-successfull... Wrong Username or Password"
    //       console.log(objectToBeSentBack);
    //       res.send(objectToBeSentBack);
    //     } else {
    //       objectToBeSentBack["error"]="Ooopppsss.. Something Went Wrong!!!"
    //         console.log(objectToBeSentBack);
    //         res.send(objectToBeSentBack);
    //     }
    // });
});

function processAuthTokenAndGetDashboardData(authToken){
  var deferred = Promise.defer();

  request({
      uri: "https://api.datonis.io/api/v3/things",
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token':authToken
      }
  }, function(error, response, body) {
      var objectContainingAllThings = JSON.parse(body);
      deferred.resolve(objectContainingAllThings);
  });

  return deferred.promise;
}

module.exports = router;
