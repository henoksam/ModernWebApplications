const mongoose = require("mongoose");
const Team = mongoose.model("Team");

module.exports.titlesGetAll = function (req, res) {
  console.log("Get all titles for a team");
  const teamId = req.params.id;
  Team.findById(teamId)
    .select("titles")
    .exec(function (err, team) {
      console.log("Get team with team ID", teamId);
      res.status(200).json(team.titles);
    });
};

const _addTitle = function (req, res, team, response) {
  if (team.titles == "") {
    team.titles = [];
  }

  var title = {
    name: req.body.name,
    type: req.body.type,
    count: req.body.count,
  };

  team.titles.push(title);

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

module.exports.titlesAddOne = function (req, res) {
  console.log("Add title to a team");
  const publisherID = req.params.publisherID;
  const teamId = req.params.id;
  console.log(teamId);
  Team.findById(teamId)
    .select("titles")
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
        _addTitle(req, res, team, response);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports.deleteATitle = function (req, res) {
  console.log("Title will be revoked");
  Team.findById(req.params.id)
    .select("titles")
    .exec(function (err, team) {
      team.titles.id(req.params.titleId).remove();

      if (err) {
        __res(500, err);
        return;
      }

      if (!team) {
        __res(400, "Title id not found");
        return;
      }

      team.save(function (err, rev) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", rev);
        res.status(204).json(rev);
      });
    });
};

const _updateATitle = function (req, res, team) {
  team.titles.id(req.params.titleId).name = req.body.name;
  team.titles.id(req.params.titleId).type = req.body.type;
  team.titles.id(req.params.titleId).count = req.body.count;
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
module.exports.titleUpdate = function (req, res) {
  const teamId = req.params.id;

  Team.findById(teamId)
    .select("titles")
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
        _updateATitle(req, res, team);
      }
    });
};
