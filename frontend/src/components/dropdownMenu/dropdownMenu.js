import React from "react";
import "./dropdownMenu.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

function DropdownMenu({ type }) {
  return (
    <div className="sortMenu">
      {type === "alphabet" && (
        <div>
          <h2 className="sortMenuOption">
            <AiOutlineSortAscending className="dropdownicon"/>
            Alphabetically (A-Z)
          </h2>
          <h2 className="sortMenuOption">
            <AiOutlineSortDescending className="dropdownicon" />
            Alphabetically (Z-A)
          </h2>
        </div>
      )}
      {type === "date" && (
        <div>
          <h2 className="sortMenuOption">Oldest date</h2>
          <h2 className="sortMenuOption">Newest date</h2>
        </div>
      )}
      {type === "rows" && (
        <div>
          <h2 className="sortMenuOption">10 rows</h2>
          <h2 className="sortMenuOption">20 rows</h2>
          <h2 className="sortMenuOption">30 rows</h2>
          <h2 className="sortMenuOption">40 rows</h2>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
