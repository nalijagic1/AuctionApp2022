import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ROLES } from "../../utils/roles";
import "./filterBadges.css";

function FilterBadges({label,unselect}) {
  return (
    <div className="badges">
        <h3>{ROLES[label.toUpperCase()]}</h3>
        <AiOutlineClose className="closeIcon" onClick={unselect}></AiOutlineClose>
    </div>
  );
}

export default FilterBadges;