angular
  .module("meanGames", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(changeRoute);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
      access: { restricted: false },
    })
    .when("/games", {
      templateUrl: "angular-app/game-list/game-list.html",
      controller: "GamesController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/games/:id", {
      templateUrl: "angular-app/game-one/game-one.html",
      controller: "GameController",
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
