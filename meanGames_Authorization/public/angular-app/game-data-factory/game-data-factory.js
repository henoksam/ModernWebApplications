angular.module("meanGames").factory("GameFactory", GameFactory);

function GameFactory($http) {
  return {
    getTenGames: getTenGames,
    getOneGame: getOneGame,
    addOneGame: addOneGame,
    replaceOneGame: replaceOneGame,
    searchOneGame: searchOneGame,
  };
  function getTenGames(offset, count) {
    return $http
      .get("/api/games?offset=" + offset + "&count=" + count)
      .then(complete)
      .catch(failed);
  }
  function getOneGame(id) {
    //let gameId = $routeParams.id;
    return $http
      .get("/api/games/" + id)
      .then(complete)
      .catch(failed);
  }

  function searchOneGame(game) {
    return $http
      .get("/api/games?game=" + game)
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
