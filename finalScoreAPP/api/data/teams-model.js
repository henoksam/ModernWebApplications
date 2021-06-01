const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
});

const titlesSchema = new mongoose.Schema({
  name: String,
  type: String,
  count: Number, 
});

const teamsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearFounded: Number,

  country: String,
  stadium: stadiumSchema,
  titles: [titlesSchema],
});

mongoose.model("Team", teamsSchema, "teams");
