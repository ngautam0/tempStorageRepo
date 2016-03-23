var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("in loginIntoAltizon");
  console.log(req.body.user);
  console.log(req.body.password);


request({
  uri: "https://api.datonis.io/api_sign_in",
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  formData:{
    "email":req.body.user,
    "password":req.body.password
  }
}, function(error, response, body) {
  console.log(body);
  var obj =JSON.parse(body);
  if (obj.auth_token !== undefined) {
    console.log(obj.auth_token);
  }
  else if(obj.errors !== undefined) {
    console.log(obj.errors);
  }
  else {
    console.log("Unknown Error");
  }
  res.send("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
});
});

module.exports = router;
