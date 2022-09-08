import React, { useState, useEffect } from "react";
import Checkbox from "../checkbox/checkbox";
import { MdOutlineTune } from "react-icons/md";
import "./filter.css";

function Filter({selectedFilter,changeFilter}) {
  const [clicked, setClicked] = useState(false);
  function changeSelectedFilter(filter,selected){
    var activeFilters = {...selectedFilter};
    activeFilters[filter] = selected;
    return activeFilters;
  }
  return (
    <div className="filtering">
      <div className="filterButton" onClick={()=>setClicked(!clicked)}>
        <MdOutlineTune className="filterIcon" />
        <h2>Filter</h2>
      </div>
      {clicked && (
        <div className="filterMenu">
          <Checkbox label="Regular users" checked={selectedFilter.user} onChange={(selection) => changeFilter(changeSelectedFilter("user",selection))}/>
          <Checkbox label="Golden users" checked={selectedFilter.golden} onChange={(selection) => changeFilter(changeSelectedFilter("golden",selection))}/>
          <Checkbox label="Restricted users" checked={selectedFilter.restricted} onChange={(selection) => changeFilter(changeSelectedFilter("restricted",selection))}/>
          <Checkbox label="Black list users" checked={selectedFilter.black} onChange={(selection) => changeFilter(changeSelectedFilter("black",selection))} />
          <Checkbox label="Archived users" checked={selectedFilter.archived} onChange={(selection) => changeFilter(changeSelectedFilter("archived",selection))}/>
        </div>
      )}
    </div>
  );
}

export default Filter;
