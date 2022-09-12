import React from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";

import GoldenUser from "../icons/goldenUser";
import ArchivedUser from "../icons/archivedUser";
import BlackUser from "../icons/blackUser";
import { BiEnvelope } from "react-icons/bi";
import ActivateUser from "../icons/activateUser";
import RestrictedUser from "../icons/restrictedUser";
import personService from "../services/person.service";
import { ROLES_CODE } from "./roles";
class MenuItems {
  findMenu(field, type, onRowSelect, onSortSelect,user) {
    switch (type) {
      case "date":
        return this.getDateSortMenu(field, onSortSelect);
      case "rows":
        return this.getRowChangeMenu(onRowSelect);
      case "alphabet":
        return this.getAlphabeticalSortMenu(field, onSortSelect);
      default:
        return this.getUserMenu(type,user,onRowSelect);
    }
  }

  updateStatus(status,person,onRowSelect){
    personService.updateStatus(person,status);
    onRowSelect();
}

  getAlphabeticalSortMenu(field, onSortSelect) {
    return (
      <div>
        <h2
          className="sortMenuOption"
          onClick={() => {
            onSortSelect({ field: field, direction: "ASC" });
          }}
        >
          <AiOutlineSortAscending className="dropdownicon" />
          Alphabetically (A-Z)
        </h2>
        <h2
          className="sortMenuOption"
          onClick={() => {
            onSortSelect({ field: field, direction: "DESC" });
          }}
        >
          <AiOutlineSortDescending className="dropdownicon" />
          Alphabetically (Z-A)
        </h2>
      </div>
    );
  }

  getDateSortMenu(field, onSortSelect) {
    return (
      <div>
        <h2
          className="sortMenuOption"
          onClick={() => {
            onSortSelect({ field: field, direction: "DESC" });
          }}
        >
          Oldest date
        </h2>
        <h2
          className="sortMenuOption"
          onClick={() => {
            onSortSelect({ field: field, direction: "ASC" });
          }}
        >
          Newest date
        </h2>
      </div>
    );
  }

  getRowChangeMenu(onRowSelect) {
    return (
      <div>
        <h2
          className="sortMenuOption"
          onClick={(event) => {
            onRowSelect(event.target.innerHTML);
          }}
        >
          10 rows
        </h2>
        <h2
          className="sortMenuOption"
          onClick={(event) => {
            onRowSelect(event.target.innerHTML);
          }}
        >
          20 rows
        </h2>
        <h2
          className="sortMenuOption"
          onClick={(event) => {
            onRowSelect(event.target.innerHTML);
          }}
        >
          30 rows
        </h2>
        <h2
          className="sortMenuOption"
          onClick={(event) => {
            onRowSelect(event.target.innerHTML);
          }}
        >
          40 rows
        </h2>
      </div>
    );
  }
  getUserMenu(type,user,onRowSelect) {
    var userMenu = (
      <>
        <h3 className="sortMenuOption">
          {" "}
          <HiOutlineUser className="dropdownicon" /> View profile{" "}
        </h3>
        <h3 className="sortMenuOption">
          <BiEnvelope className="dropdownicon" />
          Message user{" "}
        </h3>
        <hr></hr>
      </>
    );
    var statusOptions = "";
    switch (type) {
      case "black":
        statusOptions = (
          <>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.USER,user,onRowSelect)}>
              <BlackUser color="#252525" className="dropdownicon" />
              Remove from black list
            </h3>
          </>
        );
        break;
      case "archived":
        statusOptions = (
          <>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.USER,user,onRowSelect)}>
              <ActivateUser color="#252525" className="dropdownicon"  />
              Activate user
            </h3>
          </>
        );
        break;
      case "golden":
        statusOptions = (
          <>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.USER,user,onRowSelect)}>
              <GoldenUser color="#252525" className="dropdownicon"  />
              Remove golden status
            </h3>
          </>
        );
        break;
      case "restricted":
        statusOptions = (
          <>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.USER,user,onRowSelect)}>
              <BlackUser color="#252525" className="dropdownicon" />
              Remove restriction
            </h3>
            <h3 className="sortMenuOption"  onClick={()=>this.updateStatus(ROLES_CODE.BLACK,user,onRowSelect)}>
              <RestrictedUser color="#252525" className="dropdownicon"/>
              Add to black list
            </h3>
          </>
        );
        break;
      default:
        statusOptions = (
          <>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.GOLDEN,user,onRowSelect)}>
              <GoldenUser color="#252525" className="dropdownicon"/>
              Add golden status
            </h3>
            <h3 className="sortMenuOption" onClick={()=>this.updateStatus(ROLES_CODE.BLACK,user,onRowSelect)}>
              <BlackUser color="#252525" className="dropdownicon"/>
              Add to black list
            </h3>
            <h3 className="sortMenuOption"  onClick={()=>this.updateStatus(ROLES_CODE.ARCHIVED,user,onRowSelect)}>
              <ArchivedUser color="#252525" className="dropdownicon"/>
              Add to archived list
            </h3>
          </>
        );
        break;
    }
    return React.createElement("div", {}, [userMenu, statusOptions]);
  }
}

export default new MenuItems();
