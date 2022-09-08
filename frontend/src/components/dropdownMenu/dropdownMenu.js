import React from "react";
import "./dropdownMenu.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

function DropdownMenu({ type,onClick }) {
  return (
    <div className="sortMenu">
      {type === "alphabet" && (
        <div>
          <h2 className="sortMenuOption" onClick={()=>{onClick()}}>
            <AiOutlineSortAscending className="dropdownicon"/>
            Alphabetically (A-Z)
          </h2>
          <h2 className="sortMenuOption"  onClick={()=>{onClick()}}>
            <AiOutlineSortDescending className="dropdownicon" />
            Alphabetically (Z-A)
          </h2>
        </div>
      )}
      {type === "date" && (
        <div>
          <h2 className="sortMenuOption" onClick={()=>{onClick()}}>Oldest date</h2>
          <h2 className="sortMenuOption" onClick={()=>{onClick()}}>Newest date</h2>
        </div>
      )}
      {type === "rows" && (
        <div>
          <h2 className="sortMenuOption" onClick={(event)=>{onClick(event.target.innerHTML)}}>10 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{onClick(event.target.innerHTML)}}>20 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{onClick(event.target.innerHTML)}}>30 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{onClick(event.target.innerHTML)}}>40 rows</h2>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
