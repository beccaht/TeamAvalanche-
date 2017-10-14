var mongoose = require('mongoose');
var InformationObject = require('./information')
var Employee = require('./employee').schema;
var Project = require('./project').schema;
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
  companyCode: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  shortDescription: String,
  longDescription: String,
  imageUrl: String,
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