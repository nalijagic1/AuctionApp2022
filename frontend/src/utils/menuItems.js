import React from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import GoldenUser from "../icons/goldenUser";
import ArchivedUser from "../icons/archivedUser";
import BlackUser from "../icons/blackUser";
import { BiEnvelope } from "react-icons/bi";
import ActivateUser from "../icons/activateUser";
import RestrictedUser from "../icons/restrictedUser";
import personService from "../services/person.service";
import { ROLES_CODE, STATUS_REASONS } from "./roles";
class MenuItems {
  findMenu(field, type, onRowSelect, onSortSelect, user) {
    switch (type) {
      case "date":
        return this.getDateSortMenu(field, onSortSelect);
      case "rows":
        return this.getRowChangeMenu(onRowSelect);
      case "alphabet":
        return this.getAlphabeticalSortMenu(field, onSortSelect);
      case "header":
        return this.createHeaderMenu(field, onRowSelect);
      default:
        return this.getUserMenu(type, user, onRowSelect);
    }
  }

  updateStatus(status, person, onRowSelect, reason) {
    personService.updateStatus(person, status, reason).then(() => {
      onRowSelect();
    });
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
          <AiOutlineSortAscending className="dropdownSorticon" />
          Alphabetically (A-Z)
        </h2>
        <h2
          className="sortMenuOption"
          onClick={() => {
            onSortSelect({ field: field, direction: "DESC" });
          }}
        >
          <AiOutlineSortDescending className="dropdownSorticon" />
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
  getUserMenu(type, user, onRowSelect) {
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
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.USER,
                  user,
                  onRowSelect,
                  STATUS_REASONS.REGULAR
                )
              }
            >
              <BlackUser className="dropdownicon" />
              Remove from black list
            </h3>
          </>
        );
        break;
      case "archived":
        statusOptions = (
          <>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.USER,
                  user,
                  onRowSelect,
                  STATUS_REASONS.REGULAR
                )
              }
            >
              <ActivateUser className="dropdownicon" />
              Activate user
            </h3>
          </>
        );
        break;
      case "golden":
        statusOptions = (
          <>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.USER,
                  user,
                  onRowSelect,
                  STATUS_REASONS.REGULAR
                )
              }
            >
              <GoldenUser className="dropdownicon" />
              Remove golden status
            </h3>
          </>
        );
        break;
      case "restricted":
        statusOptions = (
          <>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.USER,
                  user,
                  onRowSelect,
                  STATUS_REASONS.REGULAR
                )
              }
            >
              <BlackUser className="dropdownicon" />
              Remove restriction
            </h3>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.BLACK,
                  user,
                  onRowSelect,
                  STATUS_REASONS.ADMIN_GRANTED
                )
              }
            >
              <RestrictedUser className="dropdownicon" />
              Add to black list
            </h3>
          </>
        );
        break;
      default:
        statusOptions = (
          <>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.GOLDEN,
                  user,
                  onRowSelect,
                  STATUS_REASONS.ADMIN_GRANTED
                )
              }
            >
              <GoldenUser className="dropdownicon" />
              Add golden status
            </h3>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.BLACK,
                  user,
                  onRowSelect,
                  STATUS_REASONS.ADMIN_GRANTED
                )
              }
            >
              <BlackUser className="dropdownicon" />
              Add to black list
            </h3>
            <h3
              className="sortMenuOption"
              onClick={() =>
                this.updateStatus(
                  ROLES_CODE.ARCHIVED,
                  user,
                  onRowSelect,
                  STATUS_REASONS.ADMIN_GRANTED
                )
              }
            >
              <ArchivedUser className="dropdownicon" />
              Add to archived list
            </h3>
          </>
        );
        break;
    }
    return React.createElement("div", {}, [userMenu, statusOptions]);
  }

  changeColumns(columns, field) {
    var newColumns = [ ...columns ];
    var fieldIndex = newColumns.findIndex((column) => column.name === field);
    newColumns[fieldIndex].show = !newColumns[fieldIndex].show;
    return newColumns;
  }

  createHeaderMenu(columns, onRowSelect) {
    return (
      <div className="headerMenu">
        <h3>View options</h3>
        <h3>Show columns</h3>
        {columns.map((column) => { return <div>
          {
            column.show && (
              <h2 className="sortMenuOption"
                onClick={() =>
                  onRowSelect(this.changeColumns(columns, column.name))
                }
              >
                {column.name} <AiOutlineEye className="dropdownicon"/>
              </h2>
            )
          }</div>
        })}
        <h3>Hide columns</h3>
        {columns.map((column) => {
          return (
            <div>
              {!column.show && (
                <h2 className="sortMenuOption"
                  onClick={() =>
                    onRowSelect(this.changeColumns(columns, column.name))
                  }
                >
                  {column.name} <AiOutlineEyeInvisible  className="dropdownicon"/>
                </h2>
              )}
            </div>
          );
        })}
        <hr></hr>
        <h3>
          Add new columns <AiOutlinePlus className="dropdownicon"></AiOutlinePlus>
        </h3>
      </div>
    );
  }
}

export default new MenuItems();
