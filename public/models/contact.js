var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  number: {
    type: String,
    index: true
  }
});

var Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
  Contact: Contact
}