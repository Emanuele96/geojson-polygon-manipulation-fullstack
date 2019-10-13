const express = require("express");
var bodyParser = require("body-parser");
var GJV = require("geojson-validation");
const fs = require("fs");
var path = require("path");

const app = express();
const port = process.env.PORT || 5000;
//Parser to be used for parsing the body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
//Put endpoint for updating feature collection. Request with 2 params, ID for feat.coll. ID and DATA for feat.coll. Data to write on File
app.put("/api/feature-collection/:id/", (req, res) => {
  //Given a feature collection object, GVJ.valid returns true if is a valid feature collection.
  if (GJV.valid(req.body)) {
    //Update the feature collection object
    fs.writeFileSync(
      path.join(
        __dirname,
        "./data/feature-collection/",
        req.params.id + ".json"
      ),
      JSON.stringify(req.body)
    );
    res.json({ result: "Feature Collection updated with success!" });
  } else {
    //Throw an error
    console.log(
      "The input to the API is not a valid feature collection object"
    );
  }
});
