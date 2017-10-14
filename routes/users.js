var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var BSON = require('bson');
var bcrypt = require('bcrypt');
var Long = BSON.long;
var bson = new BSON();


var User = require('../models/user')

function requiresLogin(req, res, next) {
  console.log("This route requries login!");
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hi!');
});

router.post('/signup', function(req,res,next) {
  console.log("Signing up a user!");
  if (req.body.email &&
    req.body.firstName &&
    req.body.password &&
    req.body.lastName) {
    var userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        req.session.userId = user._id;
        return res.redirect('/users/profile');
      }
    });
  }
})

router.post('/login', function(req,res,next) {
  console.log("Logging in a User!");
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }
  });
})

router.use('/profile', requiresLogin);
// GET route after registering
router.get('/profile', function (req, res, next) {
  console.log("Looking up a profile!");
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.firstName + " " + user.lastName + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  console.log("Logging out a user!");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
