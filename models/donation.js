var mongoose = require('mongoose');
var DonationObject = new mongoose.Schema({
    class: {
      type: String,
      required: true
    },
    information: {
      type: String,
      required: true
    }
  });

  var Donation = mongoose.model('Information', DonationObject);
  module.exports = Donation;