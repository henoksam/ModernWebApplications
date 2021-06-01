angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameFactory, AuthFactory, $location, $route) {
  const vm = this;
  vm.title = "Mean Games App";
  vm.activated = false;

  let offset = 0;
  let count = 3;
  var query = $location.search();
  if (query.offset) offset = query.offset;
  if (query.count) count = query.count;
  GameFactory.getTenGames(offset, count).then(function (response) {
    vm.games = response;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };

  vm.addGame = function () {
    const newGame = {
      title: vm.newGameTitle,
      price: vm.newGamePrice,
      rate: vm.newGameRating,
      year: vm.newGameYear,
      minPlayers: vm.newGameMinPlayers,
      maxPlayers: vm.newGameMaxPlayers,
      minAge: vm.newGameMinAge,
      designers: vm.newGameDesigner,
    };
    if (vm.gameForm.$valid) {
      console.log(newGame);
      GameFactory.addOneGame(newGame)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  vm.nextPage = function () {
    offset += count;

    GameFactory.getTenGames(offset, count).then(function (response) {
      vm.games = response;
    });
  };

  vm.previousPage = function () {
    if (offset != 0) offset -= 2;
    GameFactory.getTenGames(offset, count).then(function (response) {
      vm.games = response;
    });
  };

  vm.searchGame = function (game) {
    GameFactory.searchOneGame(game).then(function (response) {
      alert("Searched for: " + game.toString());
      vm.games = response;
      vm.activated = true;
    });
  };

  vm.clearSearch = function () {
    GameFactory.getTenGames(0, 3).then(function (response) {
      vm.games = response;
      vm.activated = false;
      vm.random = "";
    });
  };
}
