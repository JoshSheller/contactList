var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  number: {
    type: String
  },
  nickname: {
    type: String
  }
});

var Contact = mongoose.model('Contact', ContactSchema);

module.exports = {
  Contact: Contact
}
