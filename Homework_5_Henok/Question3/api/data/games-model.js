const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: String,
  country: String,
});

const reviewsSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: String, //i made it string for testing, much easier
});

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: { type: Number, min: 1, max: 5, default: 1 },
  price: Number,
  minPlayers: { type: Number, min: 1, max: 10 },
  maxPlayers: Number,
  minAge: Number,
  designers: String,
  publisher: publisherSchema,
  reviews: [reviewsSchema],
});

mongoose.model("Game", gameSchema, "games");
