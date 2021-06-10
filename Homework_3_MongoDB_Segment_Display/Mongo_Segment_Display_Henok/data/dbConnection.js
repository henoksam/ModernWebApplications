const MongoClient = require("mongodb").MongoClient;
const dbName = "newGamesDB";
const dbUrl = "mongodb://localhost:27017/" + dbName;

let connection = null;
const open = function () {
  MongoClient.connect(
    dbUrl,
    { useUnifiedTopology: true },
    function (err, client) {
      if (err) console.log(err);
      connection = client.db(dbName);
      console.log("Connected to Database............");
    }
  );
};
const get = function () {
  return connection;
};

module.exports = {
  open: open,
  get: get,
};
