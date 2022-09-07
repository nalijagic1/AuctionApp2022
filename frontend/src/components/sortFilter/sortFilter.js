import React, { useState } from "react";
import "./sortFilter.css";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import DropdownMenu from "../dropdownMenu/dropdownMenu";

function SortFilter({
  label,
  enableSort = true,
  width = "fit-content",
  className = "sort",
  type,
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <div style={{ width: width }}>
      <div className={`sortFilter ${className}`}>
        <h2>{label}</h2>
        {enableSort && (
          <TiArrowUnsorted
            onClick={() => setClicked(!clicked)}
            className="sortIcon"
          />
        )}
      </div>
      {enableSort && clicked && (
          <DropdownMenu type={type} width={width}/>
          )}
    </div>
  );
}

export default SortFilter;
