import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import "./userManagment.css";
import { BiSearchAlt2 } from "react-icons/bi";
import TableHeader from "../../components/tableHeader/tableHeader";
import UserTableRow from "../../components/userTableRows/userTableRows";
import AuctionPagination from "../../components/auctionPagination/auctionPagination";
import personService from "../../services/person.service";
import SortFilter from "../../components/sortFilter/sortFilter";
import FilterBadges from "../../components/filterBadges/filterBadges";

function UserManagment() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    golden: false,
    user: false,
    black: false,
    restricted: false,
    archived: false,
  });
  function unselectFilter(filter){
    var activeFilter = {...selectedFilter};
    activeFilter[filter] = false;
    setSelectedFilter(activeFilter);
  }
  useEffect(() => {
    personService.getAllUsers(page - 1, count).then((response) => {
      setUsers(response.data.listOfUsers);
      setNumberOfPages(response.data.numberOfPages);
    });
  }, [page, count]);
  return (
    <div className="userManagmentView">
      <h5>User Managment</h5>
      <div className="userManagmentOptions">
        <Filter selectedFilter={selectedFilter} changeFilter = {(filter) => {setSelectedFilter(filter)}}/>
        <BiSearchAlt2 className="searchIcon" />
        <input
          id="userSearch"
          className="userSearch"
          type="text"
          placeholder="Search: Users"
        />
      </div>
      <div className="userActiveFilters">
        {Object.keys(selectedFilter).map((filter)=>{
          return <div>
            {selectedFilter[filter] && <FilterBadges label = {filter} unselect={()=> unselectFilter(filter)}></FilterBadges>}
            </div> 
        })}
      </div>
      <div className="userTable">
        <TableHeader
          checked={checked}
          setChecked={(checked) => {
            setChecked(checked);
            console.log(checked);
          }}
        />
        {users &&
          users.map((user) => {
            return <UserTableRow user={user}></UserTableRow>;
          })}
      </div>
      <div className="pagination">
        <h3>Show:</h3>
        <SortFilter
          label="10 rows"
          className="rowSelecting"
          type="rows"
          onSelect={(count) => setCount(count)}
        />
        <AuctionPagination
          count={numberOfPages}
          page={page}
          onPageChange={(event, value) => {
            setPage(value);
          }}
        />
      </div>
    </div>
  );
}

export default UserManagment;
