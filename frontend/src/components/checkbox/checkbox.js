import React from "react";
import "./checkbox.css";

function Checkbox({ label, checked = false, onChange }) {
  return (
    <div className="check">
      <label className="container">
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        ></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

export default Checkbox;
