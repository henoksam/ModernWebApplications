const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: String,
  city: String,
  street: String,
  zip: Number,
});

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  GPA: Number,

  address: addressSchema,
});

mongoose.model("Student", gameSchema, "students");
