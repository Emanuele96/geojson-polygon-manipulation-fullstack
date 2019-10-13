import React from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline
} from "react-leaflet";
import "./MapDisplay.css";
import hash from "object-hash";

class MapDisplay extends React.Component {
  state = {};

  //Toogle the coordinate order for compatibility with leaflet objects
  tooglePolygonCoordinates(coordinates) {
    let newCoordinates = [];
    for (let i = 0; i < coordinates.length; i++) {
      let tmpArray = [];
      for (let j = 0; j < coordinates[i].length; j++) {
        let tmpPoint = [coordinates[i][j][1], coordinates[i][j][0]];
        tmpArray.push(tmpPoint);
      }
      newCoordinates.push(tmpArray);
    }
    return newCoordinates;
  }

  //Displays polygons features from featureCollection to Map
  displayFeatures() {}
  render() {
    let polygonsLayers = [];
    let position = [51.5, -0.14];
    if (this.props.polygons !== null && this.props.polygons.length > 0) {
      //Polygons layer to be rendered on the top of the map
      polygonsLayers = this.props.polygons.map(polygon => (
        <Polygon
          //Using an hash of the latitude of the first point of the polygon as key
          key={hash(polygon.coordinates[0][0])}
          id={polygon.id}
          color="blue"
          //Toogling the coordinate to be displayed with leaflet
          positions={this.tooglePolygonCoordinates(polygon.coordinates)}
          onClick={this.props.sendPolygonSelect}
        />
      ));
      //Set the position to visualize on the map to the first point of the first polygon
      //Unfortunately Leaflet uses different order of Lat. and Long. so we have to invert them
      position = [
        this.tooglePolygonCoordinates(
          this.props.polygons[0].coordinates
        )[0][0][0],
        this.tooglePolygonCoordinates(
          this.props.polygons[0].coordinates
        )[0][0][1]
      ];
    }

    return (
      <Map className="Map" center={position} zoom={14}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygonsLayers};
      </Map>
    );
  }
}
export default MapDisplay;
