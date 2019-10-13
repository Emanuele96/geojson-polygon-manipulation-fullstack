import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapDisplay from "./components/MapDisplay/MapDisplay.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureCollection: null
    };
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
          this.setState({
            featureCollection: result
          });
        },
        error => {
          console.log(error, "Error while loading textdata from server"); //catch an error and throw a fail message
        }
      );
  }

  render() {
    console.log(this.state.featureCollection);
    if (this.state.featureCollection === null)
      return <h1> Loading please wait...</h1>;
    else
      return (
        <MapDisplay
          featureCollection={this.state.featureCollection}
        ></MapDisplay>
      );
  }
}

export default App;
