var mongoose = require('mongoose');
var InformationObject = new mongoose.Schema({
    class: {
      type: String,
      required: true
    },
    information: {
      type: String,
      required: true
    }
  });
  module.exports = InformationObject;