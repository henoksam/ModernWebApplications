const mongoose = require("mongoose");
require("./teams-model");
require("./users-model");
const dbName = "finalScore";
const dbURL = "mongodb://localhost:27017/" + dbName;

//This is needed to connect
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

//when application is terminated suddenly
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
  });
});

//when application is terminated
process.once("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
  });
});

//disconnection by restart
process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app restart");
    process.kill(process.pid, "SIGUSR2");
  });
});

//This is logging info
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURL);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected to ");
});
mongoose.connection.on("error", function (error) {
  console.log("Mongoose connection error " + error);
});
