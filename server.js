var express = require('express');
var app = express();
// require mongo js module
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);


app.use(express.static(__dirname + "/public"));

app.get('/contactList', function(req, res) {
  console.log('Get request successful!');

  db.contactList.find(function(err, contacts) {
  	console.log('contacts found -->', contacts);
  	res.json(contacts);
  });

  // var person1 = {
  // 	name: 'Bob',
  // 	email: 'bob@email.com',
  // 	number: '(111)-111-1111'
  // };

  // var person2 = {
  // 	name: 'Emily',
  // 	email: 'emily@email.com',
  // 	number: '(222)-222-2222'
  // };

  // var person3 = {
  // 	name: 'George',
  // 	email: 'george@email.com',
  // 	number: '(333)-333-3333'
  // };

  // var contactList = [person1, person2, person3];

  // respond to get request with contatList in json object format
});


app.listen(3000);
console.log("Server running on port 3000");