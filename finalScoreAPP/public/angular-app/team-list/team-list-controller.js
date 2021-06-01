angular.module("finalScore").controller("TeamsController", TeamsController);

function TeamsController(TeamFactory) {
  const vm = this;
  vm.title = "Final Score App";
  TeamFactory.getTenTeams().then(function (response) {
    vm.teams = response;
  });

  vm.addTeam = function () {
    const newTeam = {
      name: vm.newTeamName,
      yearFounded: vm.newTeamYearFounded,
      country: vm.newTeamCountry,
      stadium: vm.newTeamStadium,
    };
    if (vm.teamForm.$valid) {
      console.log(newTeam);
      TeamFactory.addOneTeam(newTeam)
        .then(function (response) {
          console.log(response);
          alert("New Team Added");
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}
