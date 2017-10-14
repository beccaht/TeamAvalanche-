var express = require('express');
var router = express.Router();
var path = require('path');

//Add this as a middleware if you need a route with login
function requireLogin(req, res, next) {
    console.log("This route requries login!");
    if (req.session && req.session.userId) {
            return next();
    } else {
      var err = new Error('You must be authorized to view this page.');
      err.status = 401;
      return next(err);
    }
  }

console.log(path.join(__dirname,'..','public','employees'));
router.use(express.static(path.join(__dirname,'..','public','employees')));

router.use('/', requireLogin);
/* GET home/login page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {'root': 'public'});
});


/* GET signup page */
router.get('/signUp.html', function(req, res, next) {
  res.sendFile('signUp.html', {'root': 'public'});
});

module.exports = router;
