import React, { useState, useEffect } from "react";
import Checkbox from "../checkbox/checkbox";
import { MdOutlineTune } from "react-icons/md";
import "./filter.css";

function Filter() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="filtering">
      <div className="filterButton" onClick={()=>setClicked(!clicked)}>
        <MdOutlineTune className="filterIcon" />
        <h2>Filter</h2>
      </div>
      {clicked && (
        <div className="filterMenu">
          <Checkbox label="Regular users" />
          <Checkbox label="Golden users" />
          <Checkbox label="Restricted users" />
          <Checkbox label="Black list users" />
          <Checkbox label="Archived users" />
        </div>
      )}
    </div>
  );
}

export default Filter;
