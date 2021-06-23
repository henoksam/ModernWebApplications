const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  console.log("JSON Request Received");
  const defaultOffset = 0;
  const defaultCount = 5;
  const maxCount = 10;
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

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      //error check from the server
      if (err) {
        console.log("Error finding games");
        res.status(500).json(err);
      } else {
        console.log("Found games", games);
        res.status(200).json(games);
      }
    });
};

module.exports.getGameById = function (req, res) {
  const gameId = req.params.id;
  console.log("Get game with id: " + req.params.id);
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game,
    };

    if (err) {
      // Error check
      console.log("Error finding games");
      response.status = 500;
      response.message = err;
      //res.status(500).json(err);
    } else if (!game) {
      // result check
      response.status = 404;
      response.message = { message: "Game ID not found" };
      // res.status(404).json({ message: "Game ID not found" });
    } else {
      console.log("Get game with id: " + req.params.id);
      //res.status(200).json(game);
      res.status(response.status).json(response.message);
    }
  });
};
module.exports.deleteGameById = function (req, res) {
  console.log("Delete a game level reached");
  const gameId = req.params.id;
  console.log("Get game with id: " + req.params.id);
  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = {
      status: 204,
      message: deletedGame,
    };

    if (err) {
      // Error check
      console.log("Error finding games");
      response.status = 500;
      response.message = err;
      //res.status(500).json(err);
    } else if (!game) {
      // result check
      response.status = 404;
      response.message = { message: "Game ID not found" };
      // res.status(404).json({ message: "Game ID not found" });
    } else {
      console.log("Get game with id: " + req.params.id);
      //res.status(200).json(game);
      res.status(response.status).json(response.message);
    }
  });
};

module.exports.gamesAddOne = function (req, res) {
  console.log("POST new game");
  const response = {
    status: 201,
    message: "",
  };

  console.log(req.body);
  if (req.body && req.body.title && req.body.price && req.body.rate) {
    console.log("New Game being created");
    console.log(req.body);

    var newGame = {};
    //type checking
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseInt(req.body.rate);
    newGame.publisher = {};

    Game.create(newGame, function (err, game) {
      console.log("The callback game is ", game);
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.message = game;
      }

      res.status(response.status).json(response.message);
    });
  } else {
    console.log("Data missing from post body");
    response.status = 400;
    response.message = { error: "Game can not be added" };
    res.status(response.status).json(response.message);
  }
  // res.status(response.status).json(response.message);
};

module.exports.gameUpdateOne = function (req, res) {
  const gameId = req.params.id;
  console.log("Update the game with id: " + req.params.id);
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game,
    };

    if (err) {
      // Error check
      console.log("Error finding games");
      response.status = 500;
      response.message = err;
      //res.status(500).json(err);
    } else if (!game) {
      // result check
      response.status = 404;
      response.message = { message: "Game ID not found" };
    }
    if (response.status == 204) {
      console.log("Found game to be updated: ");
      game.title = req.body.title;
      game.year = req.body.year;
      game.price = req.body.price;
      game.minPlayers = req.body.minPlayers;
      game.maxPlayers = req.body.maxPlayers;
      game.rate = req.body.rate;
      game.minAge = req.body.minAge;
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
