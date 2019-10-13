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

class MapDisplay extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

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

  render() {
    const position = [this.state.lat, this.state.lng];

    const polygon = [
      [
        [-0.14007568359375, 51.5027589576403],
        [-0.12325286865234374, 51.5027589576403],
        [-0.12325286865234374, 51.512588580360244],
        [-0.14007568359375, 51.512588580360244],
        [-0.14007568359375, 51.5027589576403]
      ]
    ];
    let toogledPolygon = this.tooglePolygonCoordinates(polygon);

    return (
      <Map className="Map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon color="purple" positions={toogledPolygon} />
      </Map>
    );
  }
}

export default MapDisplay;
