const express = require("express");
const path = require("path");
const router = express.Router();
const { gamesGetAll, getGameById } = require("../controllers/games.controller");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");
const controllerUsers = require("../controllers/users.controller");

router
  .route("/games/:id")
  .get(getGameById)
  .put(controllerUsers.authenticate, controllerGames.getUpdateOne)
  .delete(controllerUsers.authenticate, controllerGames.deleteGameById);

router
  .route("/games")
  .get(gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.gamesAddOne);
router
  .route("/games/:id/publishers")
  .get(controllerPublishers.publishersGetAll)
  .post(controllerUsers.authenticate, controllerPublishers.publishersAddOne);

router.route("/users").post(controllerUsers.usersRegister);
router.route("/auth").post(controllerUsers.usersAuthenticate);

router.route("/file").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "app-1.js"));
});

module.exports = router;
