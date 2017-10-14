var mongoose = require('mongoose');
var DonationObject = new mongoose.Schema({
    project: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  });

  var Donation = mongoose.model('Donation', DonationObject);
  module.exports = Donation;