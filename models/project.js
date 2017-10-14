var mongoose = require('mongoose');
var InformationObject = require('./information')
var ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    index: true,
    trim: true
  },
  companyPic: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  longDescription: {
    type: String,
  },
  goal: {
    type: Number
  },
  donated: {
    type: Number
  }
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;