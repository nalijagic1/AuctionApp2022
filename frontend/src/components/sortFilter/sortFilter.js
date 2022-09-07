import React, { useState } from "react";
import "./sortFilter.css";
import {TiArrowUnsorted} from "react-icons/ti"

function SortFilter({label, enableSort = true,width = "fit-content"}) {

  return (
    <div className="sortFilter" style={{width: width}}>
        <h2>{label}</h2>
        {enableSort && <TiArrowUnsorted className="sortIcon"/>}
    </div>
  );
}

export default SortFilter;