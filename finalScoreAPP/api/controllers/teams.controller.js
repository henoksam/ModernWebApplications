const mongoose = require("mongoose");
const Team = mongoose.model("Team");

module.exports.teamsGetAll = function (req, res) {
  console.log("JSON Request Received");
  const defaultOffset = 0;
  const defaultCount = 10;
  const maxCount = 20;
  let offset = defaultOffset;
  let count = defaultCount;
  if (req.query.offset && req.query.count) {
    offset = parseInt(req.query.offset);
    count = parseInt(req.query.count);
  }
  //type check
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({
      message: "QueryString Offset and count should be numbers",
    });
  }

  //limit check
  if (count > maxCount) {
    res.status(400).json({
      message: "QueryString Offset and count can not exceed " + maxCount,
    });
  }

  Team.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, teams) {
      //error check from the server
      if (err) {
        console.log("Error finding teams");
        res.status(500).json(err);
      } else {
        console.log("Found teams", teams);
        res.status(200).json(teams);
      }
    });
};

module.exports.getTeamById = function (req, res) {
  const teamId = req.params.id;
  console.log("Get team with id: " + req.params.id);
  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 200,
      message: team,
    };

    if (err) {
      // Error check
      console.log("Error finding teams");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      // result check
      response.status = 404;
      response.message = { message: "Team ID not found" };
    } else {
      console.log("Get team with id: " + req.params.id);
      res.status(response.status).json(response.message);
    }
  });
};
module.exports.deleteTeamById = function (req, res) {
  const teamId = req.params.id;
  console.log("Get team with id: " + req.params.id);
  Team.findByIdAndDelete(teamId).exec(function (err, deletedTeam) {
    const response = {
      status: 204,
      message: deletedTeam,
    };

    if (err) {
      // Error check
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    } else if (!deletedTeam) {
      // result check
      response.status = 404;
      response.message = { message: "Team ID not found" };
    } else {
      console.log("Get team with id: " + req.params.id);
      res.status(response.status).json(response.message);
    }
  });
};

module.exports.teamsAddOne = function (req, res) {
  console.log("Add new team");
  const response = {
    status: 201,
    message: "",
  };

  console.log(req.body);
  if (req.body && req.body.name && req.body.yearFounded && req.body.country) {
    console.log("New Team being created");
    console.log(req.body);

    var newTeam = {};
    //type checking
    newTeam.name = req.body.name;
    newTeam.yearFounded = parseFloat(req.body.yearFounded);
    newTeam.country = req.body.country;
    newTeam.stadium = {};
    newTeam.titles = [];

    Team.create(newTeam, function (err, team) {
      console.log("The callback team is ", team);
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.message = team;
      }

      res.status(response.status).json(response.message);
    });
  } else {
    console.log("Data missing from post body");
    response.status = 400;
    response.message = { error: "Team can not be added" };
    res.status(response.status).json(response.message);
  }
};

module.exports.teamUpdateOne = function (req, res) {
  const teamId = req.params.id;
  console.log("Update the team with id: " + req.params.id);
  Team.findById(teamId).exec(function (err, team) {
    const response = {
      status: 204,
      message: team,
    };

    if (err) {
      // Error check
      console.log("Error finding teams");
      response.status = 500;
      response.message = err;
    } else if (!team) {
      // result check
      response.status = 404;
      response.message = { message: "Team ID not found" };
    }
    if (response.status == 204) {
      console.log("Found team to be updated: ");
      team.name = req.body.name;
      team.yearFounded = req.body.yearFounded;
      team.country = req.body.country;
      team.save(function (err, updatedTeam) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedTeam;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
