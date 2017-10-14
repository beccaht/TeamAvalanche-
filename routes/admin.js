var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
require('connect-flash');
var ExpressBrute = require('express-brute');
var MongooseStore = require('express-brute-mongoose');
var BruteForceSchema = require('express-brute-mongoose/dist/schema');

var model = mongoose.model('bruteforce', BruteForceSchema)
var store = new MongooseStore(model);

var bruteforce = new ExpressBrute(store, {
	freeRetries: 5,
	minWait: 5*60*1000, // 5 minutes
	maxWait: 60*60*1000, // 1 hour,
});

//Our User model
var User = require('../models/user')
var Employee = require('../models/employee')
var Company = require('../models/company');
var Project = require('../models/project');

//Add this as a middleware if you need a route with login
function requireLogin(req, res, next) {
    console.log("This route requries login!");
    if (req.session && req.session.userId && req.session.roles.includes("admin")) {
            return next();
    } else {
      var err = new Error('You must be authorized to view this page.');
      err.status = 401;
      return next(err);
    }
  }

router.use('/', requireLogin);
/* GET home/login page. */
router.get('/', function(req, res, next) {
  res.sendFile('menu.html', {'root': '../public/admin'});
});

router.post('/admin', function(req,res,next) {
  if (req.body.adminEmail &&
    req.body.adminPassword) {
    var userData = {
  email: req.body.adminEmail,
  password: req.body.adminPassword,
  roles: ["admin"],
  firstName: req.body.adminFirstName || "",
  lastName: req.body.adminLastName || "",
  avatarUrl: req.body.avatarUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
}
console.log(userData);
//use schema.create to insert data into the db
User.create(userData, function (err, user) {
  if (err) {
    return next(err)
  } else {
    res.json({
      "info": user
    })
  }
});
}
else {
console.log("Missing something!", req.body);
}
})

/* GET signup page */
router.get('/signUp.html', function(req, res, next) {
  res.sendFile('signUp.html', {'root': 'public'});
});

module.exports = router;
