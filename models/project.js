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
  logoUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  information: {
    type: [InformationObject],
    required: false
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