const express = require("express");
const path = require("path");
const router = express.Router();
const controllerTeams = require("../controllers/teams.controller");
const controllerStadium = require("../controllers/stadium.controller");
const controllerTitles = require("../controllers/titles.controller");

router
  .route("/teams/:id")
  .get(controllerTeams.getTeamById)
  .patch(controllerTeams.teamUpdateOne)
  .delete(controllerTeams.deleteTeamById);

router
  .route("/teams")
  .get(controllerTeams.teamsGetAll)
  .post(controllerTeams.teamsAddOne);
router
  .route("/teams/:id/stadium")
  .get(controllerStadium.stadiumGetAll)
  .post(controllerStadium.stadiumAddOne)
  .delete(controllerStadium.stadiumDelete)
  .put(controllerStadium.stadiumUpdate);

router
  .route("/teams/:id/titles")
  .get(controllerTitles.titlesGetAll)
  .post(controllerTitles.titlesAddOne);

router
  .route("/teams/:id/titles/:titleId")
  .delete(controllerTitles.deleteATitle)
  .put(controllerTitles.titleUpdate);

router.route("/users").post(controllerUsers.usersRegister);
router.route("/auth").post(controllerUsers.usersAuthenticate);

module.exports = router;
