var express = require('express');
var router = express.Router();

/* GET home/login page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {'root': 'public'});
});

/* GET signup page */
router.get('/signUp.html', function(req, res, next) {
  res.sendFile('signUp.html', {'root': 'public'});
});

module.exports = router;
