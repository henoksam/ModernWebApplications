const mongoose = require("mongoose");
const Team = mongoose.model("Team");

module.exports.stadiumGetAll = function (req, res) {
  console.log("Get Stadium for a team");
  const teamId = req.params.id;
  Team.findById(teamId)
    .select("stadium")
    .exec(function (err, team) {
      console.log("Get team with team ID", teamId);
      res.status(200).json(team.stadium);
    });
};

const _addStadium = function (req, res, team, response) {
  team.stadium = {};
  team.stadium.name = req.body.name;
  team.stadium.location = req.body.location;
  team.stadium.capacity = req.body.capacity;

  team.save(function (err, updatedGame) {
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.stadiumAddOne = function (req, res) {
  console.log("Add Stadium to team");
  const publisherID = req.params.publisherID;
  const teamId = req.params.id;
  console.log(teamId);
  Team.findById(teamId)
    .select("stadium")
    .exec(function (err, team) {
      const response = {
        status: 201,
        message: team,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!team) {
        console.log("Team id not found in datablase");
        response.status = 404;
        response.message = { message: "Team ID not found" + teamId };
      }
      // This decides how to send a response
      if (team) {
        _addStadium(req, res, team, response);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _deleteStadium = function (req, res, team) {
  team.stadium = null;
  team.save(function (err, team) {
    const response = { status: 204 };
    if (err) {
      console.log("Error finding team");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};
module.exports.stadiumDelete = function (req, res) {
  const teamId = req.params.id;
  console.log("PUT teamID ", teamId);
  Team.findById(teamId)
    .select("stadium")
    .exec(function (err, team) {
      const response = { status: 204 };
      if (err) {
        console.log("Error finding team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        response.status = 404;
        response.message = { message: "team ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deleteStadium(req, res, team);
      }
    });
};

const _updateStadium = function (req, res, team) {
  team.stadium.name = req.body.name;
  team.stadium.location = req.body.location;
  team.stadium.capacity = req.body.capacity;
  team.save(function (err, updateGame) {
    const response = { status: 204 };
    if (err) {
      console.log("Error finding Team");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};
module.exports.stadiumUpdate = function (req, res) {
  const teamId = req.params.id;
  console.log("PUT teamId ", teamId);
  Team.findById(teamId)
    .select("stadium")
    .exec(function (err, team) {
      const response = { status: 204 };
      if (err) {
        console.log("Error finding team");
        response.status = 500;
        response.message = err;
      } else if (!team) {
        response.status = 404;
        response.message = { message: "Team ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updateStadium(req, res, team);
      }
    });
};
