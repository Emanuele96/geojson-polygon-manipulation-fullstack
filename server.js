const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var path = require("path");
app.use(express.static("data"));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route for getting the feature-collection from the api server in json format
app.get("/api/feature-collection/:id/json", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./data/feature-collection/", req.params.id + ".json")
  );
});
//This route returns the number of total feature collections saved on the server in json format
app.get("/api/feature-collection/total/json/", (req, res) => {
  res.sendFile(path.join(__dirname, "./data/feature-collection/total.json"));
});
