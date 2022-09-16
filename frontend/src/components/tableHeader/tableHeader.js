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
      {columns[0].show && (
        <SortFilter
          label="Full name"
          width="150px"
          type="alphabet"
          field="last_name"
          sortId="fullName"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns[1].show && (
        <SortFilter
          label="Date of creation"
          width="180px"
          type="date"
          field="first_log_in"
          sortId="dateOfCreation"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns[3].show && (
        <SortFilter
          label="Email"
          width="150px"
          type="alphabet"
          field="email"
          sortId="email"
          onSelect={(sort) => setSort(sort)}
        />
      )}
      {columns[2].show && (
        <SortFilter label="Mobile Number" enableSort={false} />
      )}
      {columns[4].show && (
        <SortFilter label="Location" enableSort={false} width="190px" />
      )}
      {columns[5].show && (
        <SortFilter label="Status" width="100px" enableSort={false} />
      )}
      {columns[6].show && (
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
