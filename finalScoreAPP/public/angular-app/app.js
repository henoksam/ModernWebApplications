angular
  .module("finalScore", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(changeRoute);

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
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/profile", {
      templateUrl: "angular-app/profile/profile.html",
      access: { restricted: true },
    })
    .otherwise({
      redirectTo: "/",
    });
}

function changeRoute($rootScope, $location, AuthFactory, $window) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      console.log(nextRoute);
      if (
        // THis is to enable overcoming restricted URLs
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !$window.sessionStorage.token &&
        !AuthFactory.isLoggedIn
      ) {
        event.preventDefault();
        $location.path("/");
      }
    }
  );
}
