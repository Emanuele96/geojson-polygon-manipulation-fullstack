import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapDisplay from "./components/MapDisplay/MapDisplay.js";
import * as turf from "@turf/turf";
import hash from "object-hash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.selectedPolygons = [];
    this.state = {
      polygons: null
    };
    this.handlePolygonSelect = this.handlePolygonSelect.bind(this);
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
  render() {
    console.log(this.state.polygons);
    if (this.state.polygons === null) return <h1> Loading please wait...</h1>;
    else
      return (
        <MapDisplay
          polygons={this.state.polygons}
          sendPolygonSelect={this.handlePolygonSelect}
        ></MapDisplay>
      );
  }
}

export default App;
