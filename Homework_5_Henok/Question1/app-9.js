require("./api/data/db");
//require("/api/data/dbconnection").open();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api/routes");

app.set("port", 3000);
app.use(express.json());
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`App started at ${app.get("port")}`);
});
