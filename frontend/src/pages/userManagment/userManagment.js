import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import "./userManagment.css";
import { BiSearchAlt2 } from "react-icons/bi";
import TableHeader from "../../components/tableHeader/tableHeader";
import UserTableRow from "../../components/userTableRows/userTableRows";
import Pagination from "@mui/material/Pagination";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PaginationItem from "@mui/material/PaginationItem";
import personService from "../../services/person.service";
import SortFilter from "../../components/sortFilter/sortFilter";

function UserManagment() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    personService.getAllUsers().then((response) => {
      setUsers(response.data);
    });
  },[]);
  return (
    <div className="userManagmentView">
      <h5>User Managment</h5>
      <div className="userManagmentOptions">
        <Filter />
        <BiSearchAlt2 className="searchIcon" />
        <input
          id="userSearch"
          className="userSearch"
          type="text"
          placeholder="Search: Users"
        />
      </div>
      <div className="userTable">
        <TableHeader />
        {users &&
          users.map((user) => {
            return <UserTableRow user={user}></UserTableRow>;
          })}
      </div>
      <div className="pagination">
        <h3>Show:</h3>
        <SortFilter label="10 rows" className="rowSelecting" type="rows"/>
        <Pagination
        count={10}
        shape="rounded"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            components={{ last: KeyboardDoubleArrowRightIcon, first: KeyboardDoubleArrowLeftIcon }}
            {...item}
          />
        )}
      />
      <h3>Go to page:</h3>
      <input type="number" className="inputPage"></input>
      </div>
      
    </div>
  );
}

export default UserManagment;
