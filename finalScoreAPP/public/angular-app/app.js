angular.module("finalScore", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/team-list/team-list.html",
      controller: "TeamsController",
      controllerAs: "vm",
    })
    .when("/teams/:id", {
      templateUrl: "angular-app/team-one/team-one.html",
      controller: "TeamController",
      controllerAs: "vm",
    });
}
