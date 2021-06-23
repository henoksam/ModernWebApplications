const express = require("express");
const path = require("path");
const router = express.Router();
const { gamesGetAll, getGameById } = require("../controllers/games.controller");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");

/* router.get("/games", gamesGetAll).post((req, res) => {
  res.status(200).json({ json: true });
}); */


router
.route("/games/:id")
.get(getGameById)
.patch(controllerGames.gameUpdateOne)
.delete(controllerGames.deleteGameById);

router.route("/games").get(gamesGetAll).post(controllerGames.gamesAddOne);
router
  .route("/games/:id/publishers")
  .get(controllerPublishers.publishersGetAll)
  .post(controllerPublishers.publishersAddOne);
//router.route("/games/tester").get(controllerPublishers.tester);

router.route("/file").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "app-1.js"));
});

module.exports = router;
