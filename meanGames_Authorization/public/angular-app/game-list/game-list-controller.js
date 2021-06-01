angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameFactory, AuthFactory) {
  const vm = this;
  vm.title = "Mean Games App";
  /*   vm.isSubmitted = false; */
  GameFactory.getTenGames().then(function (response) {
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
}
