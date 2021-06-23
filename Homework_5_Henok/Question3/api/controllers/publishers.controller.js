const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publishersGetAll = function (req, res) {
  console.log("Get all publishers for a game");
  const gameID = req.params.id;
  Game.findById(gameID)
    .select("publisher")
    .exec(function (err, game) {
      console.log("Get game with game ID", gameID);
      res.status(200).json(game.publisher);
    });
};

module.exports.tester = function (req, res) {
  console.log("Tester working..... ");
};

const _addPublisher = function (req, res, game, response) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;

  game.save(function (err, updatedGame) {
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publishersAddOne = function (req, res) {
  console.log("Add one publisher to a game");
  const publisherID = req.params.publisherID;
  const gameID = req.params.id;
  console.log(gameID);
  Game.findById(gameID)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 201,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game id not found in datablase");
        response.status = 404;
        response.message = { message: "Game ID not found" + gameID };
      }
      // This decides how to send a response
      if (game) {
        _addPublisher(req, res, game, response);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};
