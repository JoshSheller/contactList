// var Contact = require("../models/contact").Contact;

var myApp = angular.module('myApp', []);

myApp.controller('ContactListCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello world from controller");

  // surround get request with refresh function to update data and clear newly added user data
  var refresh = function() {
  	$http.get('/contactList').success(function(response) {
      console.log('refresh response', response);
  	  $scope.contactList = response;
  	  $scope.contact = '';
  	});

  	$http.get('/favs').success(function(response) {
  	  console.log("Data received from favs get request!");

  	  $scope.favs = response;
  	});
  };

  // call refresh to get and load this data on page load
  refresh();

  $scope.addContact = function() {
  	console.log('contact to be added -->', $scope.contact);

  	// send input data to server
  	$http.post('/contactList', $scope.contact).success(function(response) {
  	  console.log('response from server', response);
  	  // immediately refresh page after adding new contact to load new contact in view instantly
  	  refresh();
  	});
  };
  
  // remove user with specified id
  $scope.remove = function(id) {
  	// log the id of user to be removed
  	console.log('id of user to be removed', id);
  	// send user to be deleted to server --> currently do nothing with removedUser, just refresh page with user removed
  	$http.delete('/contactList/' + id).success(function(removedUser) {
  	  refresh();
	  console.log('contact removed -->', removedUser);
  	});
  };

  $scope.edit = function(id) {
  	// log id of user to be edited
  	console.log('id of user to be edited', id);
  	// send edited user to server
  	$http.get('/contactList/' + id).success(function(editedUser) {
  	  $scope.contact = editedUser;
  	});
  };

  $scope.addToFavs = function(id) {
  	console.log('called addToFavs');
  	$http.post('/addToFavs/' + id).success(function(contactAddedToFavs) {
  	  refresh();
  	  console.log('user was added to favs -->', contactAddedToFavs);
  	  refresh();
  	});
  };

  $scope.update = function() {
  	console.log('id of user updated -->', $scope.contact._id);
  	$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(updatedUser) {
  	  console.log('newly updated user -->', updatedUser);
  	  refresh();
  	});
  };

  $scope.deselect = function() {
    $scope.contact = '';
  };

}]);

myApp.controller('FavsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.favNickname = function(id) {
  	$http.put('/favsNickname', {id: id, nickname: $scope.fav.nickname}).success(function(favWithNickname) {
  	  console.log('fav with new nickname -->', favWithNickname);
  	  refresh();
  	});
  };

  $scope.removeFav = function(id) {
  	$http.delete('/favs/' + id).success(function(removedFav) {
  	  refresh();
  	  console.log('fav removed -->', removedFav);
  	});
  };

  // surround get request with refresh function to update data and clear newly added user data
  var refresh = function() {
    $http.get('/contactList').success(function(response) {
      console.log("Data received from contactList get request!");

      $scope.contactList = response;
      $scope.contact = '';
    });

    $http.get('/favs').success(function(response) {
      console.log("Data received from favs get request!");

      $scope.favs = response;
    });
  };

}]);

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
  // $scope.contactList = contactList;

