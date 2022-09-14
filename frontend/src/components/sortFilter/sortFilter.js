import React, { useState } from "react";
import "./sortFilter.css";
import { TiArrowUnsorted } from "react-icons/ti";
import DropdownMenu from "../dropdownMenu/dropdownMenu";
import { useOutsideClick } from "@chakra-ui/react";

function SortFilter({
  label,
  enableSort = true,
  width = "fit-content",
  className = "sort",
  onSelect,
  field,
  type,
  sortId,
}) {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (
        event.path.some((path) => {
          return document.getElementById(sortId) === path;
        })
      ) {
        return;
      }
      setClicked(false);
    },
  });
  function getNumberFromLabel(heading) {
    var number = heading.split(" ")[0];
    return Number(number);
  }
  return (
    <div style={{ width: width }}>
      <div className={`sortFilter ${className}`} id={sortId}>
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
          reference={ref}
          field={field}
          type={type}
          width={width}
          onRowSelect={(heading = label) => {
            setClicked(false);
            setSelected(heading);
            onSelect(getNumberFromLabel(heading));
          }}
          onSortSelect={(sort) => {
            setClicked(false);
            onSelect(sort);
          }}
        />
      )}
    </div>
  );
}

export default SortFilter;
