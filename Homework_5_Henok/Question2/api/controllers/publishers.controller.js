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
/*   let offset = 0;
  let count = 5;
  if (req.query.offset && req.query.count) {
    offset = parseInt(req.query.offset);
    count = parseInt(req.query.count); */
/* const db = dbConnection.get();
  const collection = db.collection("games"); */
//const docs = collection.find();  // this is a blocking code and we want to avoid it
/*   Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.getGameById = function (req, res) {
  console.log("Get game with id: " + req.params.id);
  res.status(200).send(gamesData[req.params.id]);
}; */

/* module.exports.gamesAddOne = function (req, res) {
  console.log("POST new game");
  const db = dbConnection.get();
  const collection = db.collection("games");
  if (req.body && req.body.title && req.body.price && req.body.rate) {
    console.log(req.body);
    var newGame = {};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseInt(req.body.rate);
    collection.insertOne(newGame, function (err, response) {
      console.log(response);
      res.status(201).json(response.ops);
    });
  } else {
    console.log("Data missing from post body"),
      res.status(400).json({ error: "request data missing from post" });
  }
  console.log(req.body);
  gamesData.push(req.body);
};

}; */

const _addPublisher = function (req, res, game, response) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  /*  game.publisher.location.type = "Point";
  game.publisher.location.coordinates = [
    parseFloat(req.body.lng),
    parseFloat(req, body.lat),
  ]; */
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

      //  res.status(200), json(publisher);
      /* const publisher = game.publisher.id(publisherID);
      console.log("Get the game with gameID", gameID); */
    });
};
