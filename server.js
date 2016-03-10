var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/contactList', function(req, res) {
  console.log('Get request successful!');

  var person1 = {
  	name: 'Bob',
  	email: 'bob@email.com',
  	phone: '(111)-111-1111'
  };

  var person2 = {
  	name: 'Emily',
  	email: 'emily@email.com',
  	phone: '(222)-222-2222'
  };

  var person3 = {
  	name: 'George',
  	email: 'george@email.com',
  	phone: '(333)-333-3333'
  };

  var contactList = [person1, person2, person3];

  // respond to get request with contatList in json object format
  res.json(contactList);
});


app.listen(3000);
console.log("Server running on port 3000");