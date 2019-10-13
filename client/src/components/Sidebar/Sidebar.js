import React from "react";
import "./Sidebar.css";
import Button from "react-bootstrap/Button";
import { ButtonToolbar } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function handle() {
  console.log("union");
}
function handleIntersect() {
  console.log("intersect");
}

const Sidebar = props => {
  return (
    <div className="Sidebar">
      <Alert variant={props.typeText}>
        <p>{props.text}</p>
      </Alert>
      <ButtonToolbar>
        <Button id="union" variant="outline-primary" onClick={props.sendAction}>
          Union
        </Button>
        <Button
          id="intersect"
          variant="outline-primary"
          onClick={props.sendAction}
        >
          Intersect
        </Button>
      </ButtonToolbar>
    </div>
  );
};

export default Sidebar;
