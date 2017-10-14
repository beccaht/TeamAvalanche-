var mongoose = require('mongoose');
var DonationSchema = require('./donation')
var EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  company: String,
  projectChosen: String,
  donations: {
      type: [DonationSchema]
  }
});

var Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;