var express = require('express');
var router = express.Router();
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

//Add this as a middleware if you need a route with login
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

router.post('/signup', bruteforce.prevent, function(req,res,next) {
  console.log("Signing up a user!", req.body);
  if(!req.body.roles) {
    User.find({}).then(users => {
      if(users.length === 0) {
        req.body.roles = ["admin","employee","employerAdmin"];
      }
    })
  }
  if (req.body.email &&
    req.body.password &&
    req.body.roles) {
    var userData = {
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      avatarUrl: req.body.avatarUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        req.session.userId = user._id;
        req.session.roles = user.roles;
        return res.redirect('/users/profile');
      }
    });
  }
})

router.post('/login', bruteforce.prevent, function(req,res,next) {
  console.log("Logging in a User!");
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      req.session.roles = user.roles;
      return res.redirect('/users/profile');
    }
  });
})

router.use('/profile', bruteforce.prevent, requiresLogin);
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
          return res.send('<h1>Name: </h1>' + user.firstName + " " + user.lastName + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/users/logout">Logout</a>')
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
