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
  field,
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
          field={field}
          type={type}
          width={width}
          onRowSelect={(heading = label) => {
            setClicked(false);
            setSelected(heading);
            onSelect(getNumberFromLabel(heading));
          }}
          onSortSelect={(sort) =>{
            setClicked(false);
            onSelect(sort);
          }}
        />
      )}
    </div>
  );
}

export default SortFilter;
