import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapDisplay from "./components/MapDisplay/MapDisplay.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import * as turf from "@turf/turf";
import hash from "object-hash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.selectedPolygons = [];

    this.state = {
      polygons: null,
      //Text to visualize in sidebar
      text: "Welcome, please select 2 polygons and an action to perform",
      typeText: "primary"
    };
    this.handlePolygonSelect = this.handlePolygonSelect.bind(this);
    this.handleActionSelect = this.handleActionSelect.bind(this);
  }
  componentDidMount() {
    this.featchFeatureCollection();
  }
  //Retrieves feature collection saved on API server. First version has
  //only 1 featureCollection so value 1 is hardcoded.
  featchFeatureCollection() {
    fetch("/api/feature-collection/1/json")
      .then(res => res.json())
      .then(
        result => {
          /*this.setState({
            featureCollection: result
          });*/
          this.convertFromGeojson(result);
        },
        error => {
          console.log(error, "Error while loading textdata from server"); //catch an error and throw a fail message
        }
      );
  }
  convertFromGeojson(data) {
    let polygons = data.features.map(feature => ({
      //Using an hash of the latitude of the first point of the polygon as key
      key: hash(feature.geometry.coordinates[0][0]),
      id: hash(feature.geometry.coordinates[0][0]),
      //Toogling the coordinate to be displayed with leaflet
      coordinates: feature.geometry.coordinates
    }));
    this.setState({
      polygons: polygons
    });
  }
  //Handle the selection of one polygon.
  handlePolygonSelect(event) {
    let id = event.target.options.id;
    if (this.selectedPolygons.includes(id))
      this.selectedPolygons = this.selectedPolygons.filter(
        polygon => polygon !== id
      );
    else this.selectedPolygons.push(id);
    console.log(this.selectedPolygons);
  }

  handleActionSelect(event) {
    console.log(event.target.id);
    if (this.selectedPolygons.length < 2)
      this.setState({
        text: "Please select at least two polygons",
        typeText: "danger"
      });
    else {
      //Create turf polygons getting coordinates from my polygons with selected keys
      let polygon1 = turf.polygon(
        this.state.polygons.find(
          polygon => polygon.id === this.selectedPolygons[0]
        ).coordinates
      );
      let polygon2 = turf.polygon(
        this.state.polygons.find(
          polygon => polygon.id === this.selectedPolygons[1]
        ).coordinates
      );
      let resultPolygon = null;
      if (event.target.id === "union")
        resultPolygon = turf.union(polygon1, polygon2);
      else if (event.target.id === "intersect")
        resultPolygon = turf.intersect(polygon1, polygon2);
      let newPolygons = null;
      console.log(resultPolygon);
      if (resultPolygon.geometry.type !== "MultiPolygon") {
        //Removes the selected polygons from the list, performs union, adds it to the list and update state.
        newPolygons = this.state.polygons.filter(polygon => {
          return (
            polygon.id !== this.selectedPolygons[0] &&
            polygon.id !== this.selectedPolygons[1]
          );
        });
      } else newPolygons = this.state.polygons;

      if (resultPolygon === null) {
        this.setState({
          text: "There is no intersect between selected polygons",
          typeText: "warning",
          polygons: newPolygons
        });
        this.selectedPolygons = [];
      } else {
        newPolygons.push({
          coordinates: resultPolygon.geometry.coordinates,
          key: hash(resultPolygon.geometry.coordinates[0][0]),
          id: hash(resultPolygon.geometry.coordinates[0][0])
        });

        this.setState({
          text:
            "Union performed! Please select 2 polygons to perform an action",
          typeText: "success",
          polygons: newPolygons
        });
        this.selectedPolygons = [];
      }
    }
  }
  unionPolygons() {
    //Create turf polygons getting coordinates from my polygons with selected keys
    let polygon1 = turf.polygon(
      this.state.polygons.find(
        polygon => polygon.id === this.selectedPolygons[0]
      ).coordinates
    );
    let polygon2 = turf.polygon(
      this.state.polygons.find(
        polygon => polygon.id === this.selectedPolygons[1]
      ).coordinates
    );
    //Removes the selected polygons from the list, performs union, adds it to the list and update state.
    let newPolygons = this.state.polygons.filter(polygon => {
      return (
        polygon.id !== this.selectedPolygons[0] &&
        polygon.id !== this.selectedPolygons[1]
      );
    });
    let union = turf.union(polygon1, polygon2);
    console.log(union);
    newPolygons.push({
      coordinates: union.geometry.coordinates,
      key: hash(union.geometry.coordinates[0][0]),
      id: hash(union.geometry.coordinates[0][0])
    });

    this.setState({
      text: "Union performed! Please select 2 polygons to perform an action",
      typeText: "success",
      polygons: newPolygons
    });
    this.selectedPolygons = [];
  }
  intersectPolygons() {
    this.setState({
      text:
        "Intersect performed! Please select 2 polygons to perform an action",
      typeText: "success"
    });
    this.selectedPolygons = [];
  }
  render() {
    console.log(this.state.polygons);
    if (this.state.polygons === null) return <h1> Loading please wait...</h1>;
    else
      return (
        <div className="App">
          <Sidebar
            text={this.state.text}
            typeText={this.state.typeText}
            sendAction={this.handleActionSelect}
          ></Sidebar>
          <MapDisplay
            polygons={this.state.polygons}
            sendPolygonSelect={this.handlePolygonSelect}
          ></MapDisplay>
        </div>
      );
  }
}

export default App;
