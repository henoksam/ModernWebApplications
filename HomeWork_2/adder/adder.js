const express = require("express");
const app = express();

const path = require("path");
const { off } = require("process");

app.set("port", 4000);




app.get(["/", "/:num"], function (req, res) {
  const n = parseInt(req.params.num);
  var number = 0;
  const m = parseInt(JSON.stringify(req.query));
  number = parseInt(req.query.number, 10);
  var sum = n + number;
  console.log("The sum of " + n +" and " + number + " is: " + sum);
  res
    .status(200)
    .send("The sum of " + n +" and " + number + " is: " + sum);
});

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port " + app.get("port"));
});
