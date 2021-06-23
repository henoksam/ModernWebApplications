const express = require("express");
const path = require("path");
const router = express.Router();
const { gamesGetAll, getGameById } = require("../controllers/games.controller");
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");
const controllerReviews = require("../controllers/reviews.controller");

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

router
  .route("/games/:id/reviews")
  .get(controllerReviews.reviewsGetAll)
  .post(controllerReviews.reviewsAddOne);

router
  .route("/games/:gameId/reviews/:reviewId")
  .delete(controllerReviews.deleteAReview);

module.exports = router;
