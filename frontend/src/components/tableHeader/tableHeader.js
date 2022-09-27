import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";
import SortFilter from "../sortFilter/sortFilter";
import { TbDotsVertical } from "react-icons/tb";
import { useOutsideClick } from "@chakra-ui/react";
import "./tableHeader.css";
import DropdownMenu from "../dropdownMenu/dropdownMenu";

function TableHeader({
  setChecked,
  checked,
  setSort,
  columns,
  changeHeaderView,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (
        event
          .composedPath()
          .indexOf(document.getElementsByClassName("moreIcon")[0]) >= 0
      ) {
        return;
      }
      setShowMenu(false);
    },
  });
  return (
    <div className="tableHeader">
      <Checkbox checked={checked} onChange={(checked) => setChecked(checked)} />
      {columns["Name"] && (
        <SortFilter
          label="Full name"
          width="150px"
          type="alphabet"
          field="last_name"
          sortId="fullName"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns["Date of creation"] && (
        <SortFilter
          label="Date of creation"
          width="180px"
          type="date"
          field="first_log_in"
          sortId="dateOfCreation"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns["Email"] && (
        <SortFilter
          label="Email"
          width="150px"
          type="alphabet"
          field="email"
          sortId="email"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns["Mobile number"] && (
        <SortFilter label="Mobile Number" enableSort={false} />
      )}
      {columns["Location"] && (
        <SortFilter label="Location" enableSort={false} width="190px" />
      )}
      {columns["Status"] && (
        <SortFilter label="Status" width="100px" enableSort={false} />
      )}
      {columns["Status update"] && (
        <SortFilter
          label="Status update"
          type="date"
          field="status_update"
          sortId="statusUpdate"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      <TbDotsVertical
        className="moreIcon"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="headerOptionsMenu">
          <DropdownMenu
            reference={ref}
            type="header"
            field={columns}
            onRowSelect={(showHeader) => {
              changeHeaderView(showHeader);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default TableHeader;
