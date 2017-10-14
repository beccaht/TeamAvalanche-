var mongoose = require('mongoose');
var DonationObject = require('./donation')
var EmployeeSchema = new mongoose.Schema({
  company: String,
  projectChosen: String,
  donations: {
      type: [DonationObject]
  }
});

var Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;