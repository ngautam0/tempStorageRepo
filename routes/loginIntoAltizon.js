var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("in loginIntoAltizon");
  console.log(req.body.user);
  console.log(req.body.password);
  


  res.send("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
});

module.exports = router;
