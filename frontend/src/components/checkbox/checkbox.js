import React from "react";
import "./checkbox.css";

function Checkbox({ label }) {
  return (
    <div className="check">
      <label className="container">
        {label}
        <input type="checkbox"></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

export default Checkbox;
