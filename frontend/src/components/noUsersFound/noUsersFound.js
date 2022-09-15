import React from "react";
import {FiSmile} from "react-icons/fi"
import Button from "../button/button";
import "./noUsersFound.css";
import happy from "../../images/HappyCloud.png"
import sad from "../../images/SadCloud.png"

function NoUsersFound(props) {
  return (
    <div className="noResults">
      <img src={props.filter.length > 0 && props.filter[0] === 2 ? sad: happy} className="cloudIcon"></img>
      <p>There are no selected users</p>
      <Button label="View all users" onClick={()=>props.onClick()} buttonClass ="purpleBorder"></Button>
    </div>
  );
}

export default NoUsersFound;