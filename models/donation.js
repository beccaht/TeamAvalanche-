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

  module.exports = DonationObject;