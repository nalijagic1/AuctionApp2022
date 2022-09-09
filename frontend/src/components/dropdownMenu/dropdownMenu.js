import React from "react";
import "./dropdownMenu.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import {
    HiOutlineUser
} from "react-icons/hi"
import {BiEnvelope} from "react-icons/bi"
function DropdownMenu(props) {
  return (
    <div className="sortMenu">
      {props.type === "alphabet" && (
        <div>
          <h2 className="sortMenuOption" onClick={()=>{props.onClick()}}>
            <AiOutlineSortAscending className="dropdownicon"/>
            Alphabetically (A-Z)
          </h2>
          <h2 className="sortMenuOption"  onClick={()=>{props.onClick()}}>
            <AiOutlineSortDescending className="dropdownicon" />
            Alphabetically (Z-A)
          </h2>
        </div>
      )}
      {props.type === "date" && (
        <div>
          <h2 className="sortMenuOption" onClick={()=>{props.onClick()}}>Oldest date</h2>
          <h2 className="sortMenuOption" onClick={()=>{props.onClick()}}>Newest date</h2>
        </div>
      )}
      {props.type === "rows" && (
        <div>
          <h2 className="sortMenuOption" onClick={(event)=>{props.onClick(event.target.innerHTML)}}>10 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{props.onClick(event.target.innerHTML)}}>20 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{props.onClick(event.target.innerHTML)}}>30 rows</h2>
          <h2 className="sortMenuOption" onClick={(event)=>{props.onClick(event.target.innerHTML)}}>40 rows</h2>
        </div>
      )}
      {props.type === "user" && (
        <div>
            
            <h3 className="sortMenuOption"><HiOutlineUser  className="dropdownicon"></HiOutlineUser> View profile</h3>
            <h3 className="sortMenuOption"><BiEnvelope className="dropdownicon"/>Message user</h3>
            <hr></hr>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
