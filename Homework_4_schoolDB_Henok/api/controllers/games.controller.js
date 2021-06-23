const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function (req, res) {
  console.log("JSON Request Received");
  let offset = 0;
  let count = 10;
  if (req.query.offset && req.query.count) {
    offset = parseInt(req.query.offset);
    count = parseInt(req.query.count);
  }

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.getStudentById = function (req, res) {
  const gameId = req.params.id;
  console.log("Get game with id: " + req.params.id);
  Student.findById(gameId).exec(function (err, game) {
    res.status(200).json(game);
  });
};

module.exports.addressesGetAll = function (req, res) {
  console.log("Get all Addresses for a student");
  const gameID = req.params.id;
  Student.findById(gameID)
    .select("address")
    .exec(function (err, game) {
      console.log("Get game with game ID", gameID);
      res.status(200).json(game.address);
    });
};
module.exports.addressesGetOne = function (req, res) {
  console.log("Get City from Addresses of a student");
  const gameID = req.params.id;
  const id2 = req.params.id2;

  Student.findById(gameID)
    .select("address")
    .exec(function (err, game) {
      console.log("Get game with game ID", id2);
      res.status(200).json(game.address[id2]);
    });
};

