angular.module("finalScore").factory("TeamFactory", TeamFactory);

function TeamFactory($http) {
  return {
    getTenTeams: getTenTeams,
    getOneTeam: getOneTeam,
    addOneTeam: addOneTeam,
    deleteOneTeam: deleteOneTeam,
  };
  function getTenTeams() {
    return $http.get("/api/teams").then(complete).catch(failed);
  }
  function getOneTeam(id) {
    //let teamId = $routeParams.id;
    return $http
      .get("/api/teams/" + id)
      .then(complete)
      .catch(failed);
  }

  function addOneTeam(team) {
    return $http.post("/api/teams", team).then(complete).catch(failed);
  }

  function deleteOneTeam(teamId) {
    return $http
      .delete("api/teams/" + teamId)
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
