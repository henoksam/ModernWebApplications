angular.module("meanGames").factory("GameFactory", GameFactory);

function GameFactory($http) {
  return {
    getTenGames: getTenGames,
    getOneGame: getOneGame,
    addOneGame: addOneGame,
    replaceOneGame: replaceOneGame,
  };
  function getTenGames() {
    return $http.get("/api/games").then(complete).catch(failed);
  }
  function getOneGame(id) {
    //let gameId = $routeParams.id;
    return $http
      .get("/api/games/" + id)
      .then(complete)
      .catch(failed);
  }

  function addOneGame(game) {
    return $http.post("/api/games", game).then(complete).catch(failed);
  }

  function replaceOneGame(gameId, game) {
    return $http
      .put("/api/games/" + gameId, game)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }
  function failed(error) {
    return error.statusText;
  }
}
