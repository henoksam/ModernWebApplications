const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function (req, res) {
  console.log("Get all reviews for a game");
  const gameID = req.params.id;
  Game.findById(gameID)
    .select("reviews")
    .exec(function (err, game) {
      console.log("Get game with game ID", gameID);
      res.status(200).json(game.reviews);
    });
};

const _addReview = function (req, res, game, response) {
  if (!game.reviews) game.reviews = {};
  var rev = {
    name: req.body.name,
    review: req.body.review,
    date: req.body.date,
  };

  game.reviews.push(rev);

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

module.exports.reviewsAddOne = function (req, res) {
  console.log("Add one review to a game");
  const publisherID = req.params.publisherID;
  const gameID = req.params.id;
  console.log(gameID);
  Game.findById(gameID)
    .select("reviews")
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
        _addReview(req, res, game, response);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports.deleteAReview = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, game) {
      game.reviews.id(req.params.reviewId).remove();

      if (err) {
        __res(500, err);
        return;
      }

      if (!game) {
        __res(400, "Review id not found");
        return;
      }

      game.save(function (err, rev) {
        if (err) {
          __res(500, err);
          return;
        }
        console.log("successfully deleted", rev);
        res.status(204).json(rev);
      });
    });
};
