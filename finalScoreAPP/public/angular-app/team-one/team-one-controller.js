angular.module("finalScore").controller("TeamController", TeamController);

function TeamController(TeamFactory, $routeParams) {
  const vm = this;
  let teamId = $routeParams.id;
  TeamFactory.getOneTeam(teamId).then(function (response) {
    vm.teams = response;
  });

  vm.deleteTeam = function (id) {
    console.log("delete Team with TeamId: ", id);
    TeamFactory.deleteOneTeam(id).then(function (response) {
      vm.status = response;
      alert("You just deleted the Team with id:" + id);
      location.replace("http://localhost:3000/#!/");
    });
  };
}
