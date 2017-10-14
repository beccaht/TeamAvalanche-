var express = require('express');
var router = express.Router();

var User = require('../models/user')
var Employee = require('../models/employee')
var Company = require('../models/company');
var Project = require('../models/project');

/* GET home/login page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {'root': 'public'});
});

/* GET signup page */
router.get('/signUp.html', function(req, res, next) {
  res.sendFile('signUp.html', {'root': 'public'});
});

router.get('/projects', function(req,res,next) {
  Project.find().then(projects => {
    return res.json(projects);
  })
})

router.get('/project', function(req,res,next) {
  if(req.body.title) {

    Project.find({title: req.body.title}).then(project => {
      return res.json(project);
    })
  }
})

router.get('/companies', function(req,res,next) {
  Company.find().then(companies => {
    return res.json(companies);
  })
})

router.get('/company', function(req,res,next) {
  if(req.body.companyName) {
    Company.find({"name":req.body.companyName}).then(companies => {
      return res.json(companies);
    })
  }
})

router.get('/employee', function(req,res,next) {
  if(req.body.email) {
    User.find({"email": email}).then(user => {
      if(user) {
        Employee.find({"email": email}).then(employee => {
          user.employee = employee;
          return res.json(user);
        })
      }
      return res.json(user);
    })
  }
})

router.get('/employees', function(req,res,next) {
  if(req.body.companyCode) {
    Company.find({companyCode: req.body.companyCode}).then(company => {
      return res.json(company.employees);
    })
  }
})

module.exports = router;
