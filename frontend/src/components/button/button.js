import React from "react";
import "./button.css";

function Button({ label, icon, onClick, buttonClass }) {
  return (
    <div className="button">
      <button type="button" className={buttonClass} onClick={onClick}>
        {label}
        <i>{icon}</i>
      </button>
    </div>
  );
}

export default Button;
