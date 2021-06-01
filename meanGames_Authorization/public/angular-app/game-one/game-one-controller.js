angular.module("meanGames").controller("GameController", GameController);

function GameController(GameFactory, $routeParams, AuthFactory) {
  const vm = this;
  const gameId = $routeParams.id;
  GameFactory.getOneGame(gameId).then(function (response) {
    vm.games = response;
    let game = response;
    console.log(vm.game);
    console.log(game);
    //vm.games._id
    vm.editedGamePrice = game.price;
    vm.editedGameMinPlayers = game.minPlayers;
    vm.editedGameMaxPlayers = game.maxPlayers;
    vm.editedGameMinAge = game.minAge;
  });

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };
  vm.updateGame = function () {
    const editedGame = {
      title: vm.games.title,
      year: vm.games.year,
      rate: vm.games.rate,
      price: vm.editedGamePrice,
      minPlayers: vm.editedGameMinPlayers,
      maxPlayers: vm.editedGameMaxPlayers,
      designers: vm.games.designers,
      publisher: vm.games.publisher,
    };
    GameFactory.replaceOneGame(gameId, editedGame)
      .then(function () {
        $route.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
