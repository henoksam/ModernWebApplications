angular.module("henoksApp", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/main.html",
    controller: "MainController",
    controllerAs: "mainCtrl",
  });
}
