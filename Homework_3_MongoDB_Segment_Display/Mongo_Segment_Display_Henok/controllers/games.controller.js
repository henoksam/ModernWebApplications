const gamesData = require("../data/games.json");
const { get } = require("../data/dbConnection");
const dbConnection = require("../data/dbConnection");
const { json } = require("express");
const { ObjectID } = require("bson");

module.exports.gamesGetAll = function (req, res) {
  console.log("JSON Request Received");

  let count = 3;
  if (req.query.count) {
    if (parseInt(req.query.count) <= 7 && parseInt(req.query.count) >= 3)
      count = parseInt(req.query.count);
  }
  const db = dbConnection.get();
  const collection = db.collection("games");
  collection
    .find()
    .limit(count)
    .toArray(function (err, docs) {
      console.log("Found games", docs);
      res.status(200).json(docs);
    });
};
