const express = require("express");
const path = require("path");
const router = express.Router();
const {gamesGetAll, getGameById} = require("../controllers/games.controller");

router.get("/games",gamesGetAll)
    .post((req, res) => {
        res.status(200).json({json: true});
    });


module.exports = router;