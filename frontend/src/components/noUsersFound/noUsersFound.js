import React from "react";
import {FiSmile} from "react-icons/fi"
import Button from "../button/button";
import "./noUsersFound.css";

function NoUsersFound(props) {
  return (
    <div className="noResults">
      <FiSmile size={40} className="smileIcon"></FiSmile>
      <p>There are no selected users</p>
      <Button label="View all users" onClick={()=>props.onClick()} buttonClass ="purpleBorder"></Button>
    </div>
  );
}

export default NoUsersFound;