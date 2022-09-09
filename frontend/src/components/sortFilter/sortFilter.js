import React, { useState } from "react";
import "./sortFilter.css";
import { TiArrowUnsorted } from "react-icons/ti";
import DropdownMenu from "../dropdownMenu/dropdownMenu";

function SortFilter({
  label,
  enableSort = true,
  width = "fit-content",
  className = "sort",
  onSelect,
  type,
}) {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(label);
  function getNumberFromLabel(heading) {
    var number = heading.split(" ")[0];
    return Number(number);
  }
  return (
    <div style={{ width: width }}>
      <div className={`sortFilter ${className}`}>
        <h2>{selected}</h2>
        {enableSort && (
          <TiArrowUnsorted
            onClick={() => setClicked(!clicked)}
            className="sortIcon"
          />
        )}
      </div>
      {enableSort && clicked && (
        <DropdownMenu
          type={type}
          width={width}
          onClick={(heading = label) => {
            setClicked(false);
            setSelected(heading);
            onSelect(getNumberFromLabel(heading));
          }}
        />
      )}
    </div>
  );
}

export default SortFilter;
