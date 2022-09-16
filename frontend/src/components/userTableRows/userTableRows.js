import React, { useEffect, useState } from "react";
import Checkbox from "../checkbox/checkbox";
import { Avatar } from "@mui/material";
import TooltipMessage from "../tooltipMessage/tooltipMessage";
import { TbDotsVertical } from "react-icons/tb";
import moment from "moment";
import "./userTableRows.css";
import {ROLES_ICON, ROLES_TITLES } from "../../utils/roles";
import DropdownMenu from "../dropdownMenu/dropdownMenu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useOutsideClick } from "@chakra-ui/react";
import { StyledEngineProvider } from "@mui/material/styles";

function UserTableRow({
  user,
  checked,
  changeStatusInTable,
  updateSelection,
  rowId,
  columns
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectUser, setSelectUser] = useState(checked);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (
        event
          .composedPath()
          .indexOf(document.getElementsByClassName("actionMenuIcon")[rowId]) >=
        0
      ) {
        return;
      }
      setShowMenu(false);
    },
  });
  useEffect(() => {
    setSelectUser(checked);
  }, [checked]);
  return (
    <div className={`tableRow row${user.status}`}>
      <div className="selectUser">
        <Checkbox
          checked={selectUser}
          onChange={(select) => {
            setSelectUser(select);
            updateSelection(select);
          }}
        />
      </div>
      { columns[0].show &&<div className="userName">
      <div className="userAvatar">
        <Avatar src={user.picture} />
      </div>
      <h2 className="userFullName">
        {user.lastName} {user.firstName}
      </h2></div>}
      { columns[1].show && <h2 className="creationDate">
        {moment(user.firstLogIn).format("DD MMMM YYYY")}
      </h2>}
      { columns[3].show && <h2 className="userEmail">{user.email}</h2>}
      { columns[2].show &&<h2 className="userPhoneNumber">{user.phoneNumber}</h2>}
      { columns[4].show &&<h2 className="userAddress">{user.address && user.address.street}</h2>}
      { columns[5].show && <div className="userStatusIcon">
        <h2 className={`userStatus${user.status}`}>
          {ROLES_TITLES[user.status.toUpperCase()]}
        </h2>
        <StyledEngineProvider injectFirst>
          <TooltipMessage
            className="statusTooltip"
            title={
              <div className="statusTooltipContent">
                <h2>{ROLES_ICON[user.status]}{ROLES_TITLES[user.status.toUpperCase()]} user</h2>
              <p>{user.statusReason}</p>
              </div>
            }
            arrow
            placement="top"
          >
            <i>
              <AiOutlineInfoCircle />
            </i>
          </TooltipMessage>
        </StyledEngineProvider>
      </div>}
      { columns[6].show && <h2 className="userStatusUpdate">
        {moment(user.statusUpdate).format("DD MMMM YYYY")}
      </h2>}
      <TbDotsVertical
        onClick={() => {
          setShowMenu(showMenu ? false : true);
        }}
        className="actionMenuIcon"
      ></TbDotsVertical>
      {showMenu && (
        <div className="dropdownUserOptions">
          <DropdownMenu
            reference={ref}
            type={user.status.toLowerCase()}
            user={user.id}
            onRowSelect={() => {
              setShowMenu(false);
              changeStatusInTable();
            }}
          ></DropdownMenu>
        </div>
      )}
    </div>
  );
}

export default UserTableRow;
