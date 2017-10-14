var mongoose = require('mongoose');
var InformationObject = require('./information')
var Employee = require('employee');
var Project = require('project');
var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  numEmployees: {
    type: String,
    trim: true
  },
  employees: {
    type: [Employee]
  },
  projects: {
    type: [Project]
  }
});

var Company = mongoose.model('Company', CompanySchema);
module.exports = Company;