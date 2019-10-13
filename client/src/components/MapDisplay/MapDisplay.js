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
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };
  featureCounter = 0;

  //Toogle the coordinate order for compatibility with leaflet objects
  tooglePolygonCoordinates(polygon) {
    let newPolygon = [];
    for (let i = 0; i < polygon.length; i++) {
      let tmpArray = [];
      for (let j = 0; j < polygon[i].length; j++) {
        let tmpPoint = [polygon[i][j][1], polygon[i][j][0]];
        tmpArray.push(tmpPoint);
      }
      newPolygon.push(tmpArray);
    }
    return newPolygon;
  }
  //Displays polygons features from featureCollection to Map
  displayFeatures() {}
  render() {
    const position = [this.state.lat, this.state.lng];

    let polygons = this.props.featureCollection.features.map(feature => (
      <Polygon
        //Using an hash of the latitude of the first point of the polygon as key
        key={hash(feature.geometry.coordinates[0][0])}
        color="blue"
        //Toogling the coordinate to be displayed with leaflet
        positions={this.tooglePolygonCoordinates(feature.geometry.coordinates)}
      />
    ));
    return (
      <Map className="Map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polygons};
      </Map>
    );
  }
}
export default MapDisplay;
