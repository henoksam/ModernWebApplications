const mongoose = require("mongoose");
const dbName = "SchoolDB";
const dburl = "mongodb://localhost:27017/" + dbName;
const db = require("./students-model.js");
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected.....  " + dburl);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connected....  ");
});

mongoose.connection.on("error", function () {
  console.log("Mongoose error....  " + err);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application terminated");
  });
});
process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by soggur application terminated");
    process.kill(process.pid, "SIGUSR2");
  });
});
