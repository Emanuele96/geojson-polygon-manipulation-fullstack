import React from "react";
import "./Sidebar.css";
import Button from "react-bootstrap/Button";
import { ButtonToolbar } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const Sidebar = props => {
  return (
    <div className="Sidebar">
      <Alert variant={props.typeText}>
        <p>{props.text}</p>
      </Alert>
      <ButtonToolbar>
        <Button id="Union" variant="outline-primary" onClick={props.sendAction}>
          Union
        </Button>
        {"  "}
        <Button
          id="Intersect"
          variant="outline-primary"
          onClick={props.sendAction}
        >
          Intersect
        </Button>
      </ButtonToolbar>
      <div className="footer">
        <h5>Made by Emanuele Caprioli</h5>
        <a href="https://github.com/Emanuele96/geojson-polygon-manipulation-fullstack">
          Link til Github Repo
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
