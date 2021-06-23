const express = require("express");
const path = require("path");
const router = express.Router();
const {
  studentsGetAll,
  getStudentById,
  addressesGetAll,
  addressesGetOne,
} = require("../controllers/games.controller");
const controllerGames = require("../controllers/games.controller");
//const controllerPublishers = require("../controllers/publishers.controller");

router.get("/students", studentsGetAll).post((req, res) => {
  res.status(200).json({ json: true });
});

router.route("/students/:id").get(getStudentById);

router.route("/students/:id/addresses").get(addressesGetAll);
router.route("/students/:id/addresses/:id2").get(addressesGetOne);
//router.route("/games/tester").get(controllerPublishers.tester);

router.route("/file").get((req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "app-1.js"));
});

module.exports = router;
