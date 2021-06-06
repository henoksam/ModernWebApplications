const express = require("express")
const app = express();
const path = require("path");
const routes = require("./routes");
require("./data/dbConnection").open();

app.set("port", 3000);
app.use("/api", routes);


app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
    console.log(`App started at ${app.get("port")}`)
})
