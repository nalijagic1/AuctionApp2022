import React from "react";
import "./dropdownMenu.css";
import menuItems from "../../utils/menuItems";
function DropdownMenu(props) {
  return (
    <div className="sortMenu" ref={props.reference}>
      {menuItems.findMenu(props.field,props.type,props.onRowSelect,props.onSortSelect,props.user)}
    </div>
  );
}

export default DropdownMenu;
