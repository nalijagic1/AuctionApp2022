import React, { useState, useEffect } from "react";
import Checkbox from "../checkbox/checkbox";
import { MdOutlineTune } from "react-icons/md";
import { ROLES_CODE } from "../../utils/roles";
import "./filter.css";
import { useOutsideClick } from "@chakra-ui/react";

function Filter({ selectedFilter, changeFilter }) {
  const [clicked, setClicked] = useState(false);
  function changeSelectedFilter(filter, selected) {
    var activeFilters = { ...selectedFilter };
    activeFilters[filter] = selected;
    return activeFilters;
  }
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (
        event
          .composedPath()
          .indexOf(document.getElementsByClassName("filterButton")[0]) >= 0
      ) {
        return;
      }
      setClicked(false);
    },
  });
  return (
    <div className="filtering">
      <div
        className="filterButton"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <MdOutlineTune className="filterIcon" />
        <h2>Filter</h2>
      </div>
      {clicked && (
        <div className="filterMenu" ref={ref}>
          <Checkbox
            label="Regular users"
            checked={selectedFilter.user}
            onChange={(selection) =>
              changeFilter(
                changeSelectedFilter("user", selection),
                ROLES_CODE.USER,
                selection
              )
            }
          />
          <Checkbox
            label="Golden users"
            checked={selectedFilter.golden}
            onChange={(selection) =>
              changeFilter(
                changeSelectedFilter("golden", selection),
                ROLES_CODE.GOLDEN,
                selection
              )
            }
          />
          <Checkbox
            label="Restricted users"
            checked={selectedFilter.restricted}
            onChange={(selection) =>
              changeFilter(
                changeSelectedFilter("restricted", selection),
                ROLES_CODE.RESTRICTED,
                selection
              )
            }
          />
          <Checkbox
            label="Black list users"
            checked={selectedFilter.black}
            onChange={(selection) =>
              changeFilter(
                changeSelectedFilter("black", selection),
                ROLES_CODE.BLACK,
                selection
              )
            }
          />
          <Checkbox
            label="Archived users"
            checked={selectedFilter.archived}
            onChange={(selection) =>
              changeFilter(
                changeSelectedFilter("archived", selection),
                ROLES_CODE.ARCHIVED,
                selection
              )
            }
          />
        </div>
      )}
    </div>
  );
}

export default Filter;
