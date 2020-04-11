import React from "react";
import "../Jumbotron/index.css"; 

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 125, clear: "both", paddingTop: 50, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
