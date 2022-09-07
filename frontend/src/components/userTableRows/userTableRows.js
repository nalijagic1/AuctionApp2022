import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";
import { Avatar } from "@mui/material";
import TooltipMessage from "../tooltipMessage/tooltipMessage";
import { TbDotsVertical } from "react-icons/tb";
import moment from "moment";
import "./userTableRows.css";
import { ROLES, ROLES_ICON } from "../../utils/roles";

function UserTableRow({ user }) {
  return (
    <div className={`tableRow row${user.status}`}>
      <div className="selectUser">
        <Checkbox />
      </div>
      
      <div className="userAvatar">
        <Avatar src={user.picture}/>
      </div>
      <h2 className="userName">
        {user.lastName} {user.firstName}
      </h2>
      <h2 className="creationDate">{moment(user.firstLogIn).format("DD MMMM YYYY")}</h2>
      <h2 className="userEmail">{user.email}</h2>
      <h2 className="userPhoneNumber">{user.phoneNumber}</h2>
      <h2 className="userAddress">{user.address && user.address.street}</h2>
      <div className="userStatusIcon"> <TooltipMessage
                title={ROLES[user.status.toUpperCase()]}
                arrow
                placement="top"
              ><div>{ROLES_ICON[user.status]}</div></TooltipMessage></div>
      <h2 className="userStatusUpdate">{moment(user.statusUpdate).format("DD MMMM YYYY")}</h2>
      <TbDotsVertical className="actionMenuIcon"></TbDotsVertical>
    </div>
  );
}

export default UserTableRow;
