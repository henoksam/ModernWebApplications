angular.module("henoksApp").controller("MainController", MainController);

function MainController($http) {
  var vm = this;
  $http
    .get("https://official-joke-api.appspot.com/random_ten")
    .then(function (response) {
      vm.jokes = response.data;
    });
}

