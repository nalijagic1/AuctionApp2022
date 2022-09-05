import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Dashboard from "../../icons/dashboard";
import Item from "../../icons/item";
import Messages from "../../icons/messages";
import Settings from "../../icons/settings";
import Transaction from "../../icons/transaction";
import User from "../../icons/user";
import "./sideBar.css";

function SideBar({ expanded }) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="sideBarView">
      <div className="sideBar">
        {expand ? (
          <IoIosArrowBack
            className="icons"
            onClick={() => {
              setExpand(false);
              expanded(false);
            }}
          />
        ) : (
          <IoIosArrowForward
            className="icons"
            onClick={() => {
              setExpand(true);
              expanded(true);
            }}
          />
        )}
        <div className="sideBarOption">
          <Dashboard className="icons" />
          {expand && <h2>Dashboard</h2>}
        </div>
        <div className="sideBarOption">
          <User className="icons" />
          {expand && <h2>Users Managment</h2>}
        </div>

        <div className="sideBarOption">
          <Item className="icons" />
          {expand && <h2>Items Managment</h2>}
        </div>

        <div className="sideBarOption">
          <Transaction className="icons" />
          {expand && <h2>Transactions Management</h2>}
        </div>
        <div className="sideBarOption">
          <Messages className="icons" />
          {expand && <h2>Messages</h2>}
        </div>
        <div className="sideBarOption">
          <Settings className="icons" />
          {expand && <h2>Settings</h2>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
