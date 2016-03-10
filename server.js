var express = require('express');
var app = express();
// require mongo js module
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
// require ability to parse body response from requests
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));

// give body parsing functionality to app / server
app.use(bodyParser.json());

app.get('/contactList', function(req, res) {
  console.log('Get request successful!');

  // find contactList on personal server
  db.contactList.find(function(err, contacts) {
    console.log('contacts found -->', contacts);
    res.json(contacts);
  });
});

app.post('/contactList', function(req, res) {
  console.log(req.body);
  // insert new data into database as well as return data back to controller
  db.contactList.insert(req.body, function(err, newContact) {
  	res.json(newContact);
  });
});

// use :id to show it is not part of the string but a parameter instead
app.delete('/contactList/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  // select user with specified id to be deleted --> return specified contact to controller
  db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, contact) {
  	res.json(contact);
  });
});

app.get('/contactList/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, contact) {
  	res.json(contact);
  });
});

app.put('/contactList/:id', function(req, res) {
  var id = req.params.id;
  db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
  	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
  	new: true}, function(err, updatedContact) {
  	  res.json(updatedContact);
  	});
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



app.listen(3000);
console.log("Server running on port 3000");