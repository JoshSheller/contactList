var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello world from controller");

  $http.get('/contactList').success(function(response) {
  	console.log("Data received from get request!");

  	$scope.contactList = response;
  });

  $scope.addContact = function() {
  	console.log($scope.contact);

  	// send input data to server
  	$http.post('/contactList', $scope.contact);
  };

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

}]);