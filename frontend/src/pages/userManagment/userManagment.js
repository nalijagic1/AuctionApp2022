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
import {
  REMOVE_STATUS_MESSAGE,
  REMOVE_STATUS_BUTTON,
  ROLES_CODE,
} from "../../utils/roles";
import NoUsersFound from "../../components/noUsersFound/noUsersFound";
import Button from "../../components/button/button";
import ConfirmDialog from "../../components/confirmDialog/confirmDialog";
import Notification from "../../components/notification/notification";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPES,
} from "../../utils/notificationConstants";

function UserManagment() {
  const [searchUser, setSearchUser] = useState("");
  const [newGoldenUsers, setNewGoldenUsers] = useState(0);
  const [newRestrictedUsers, setNewRestrictedUsers] = useState(0);
  const [showGoldenNotification,setShowGoldenNotification] = useState(true)
  const [showRestrictedNotification,setShowRestrictedNotification] = useState(true)
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState();
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });
  const [checked, setChecked] = useState(false);
  const [filterCodes, setFilterCodes] = useState([]);
  const [statusChange, setStatusChange] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    golden: false,
    user: false,
    black: false,
    restricted: false,
    archived: false,
  });
  const ref = React.useRef();
  function unselectFilter(filter) {
    var activeFilter = { ...selectedFilter };
    activeFilter[filter] = false;
    setFilterCodes(
      filterCodes.filter(function (value, index, arr) {
        return value !== ROLES_CODE[filter.toUpperCase()];
      })
    );
    setSelectedFilter(activeFilter);
    setPage(1);
  }

  function onRemoveApproved() {
    personService.updateStatus(selectedUsers, ROLES_CODE.USER).then(() => {
      setSelectedUsers([]);
      setChecked(false);
      setStatusChange(statusChange + 1);
      setOpenConfirm(false);
    });
  }
  useEffect(() => {
    personService
      .getAllUsers(page - 1, count, filterCodes, sort, searchUser)
      .then((response) => {
        setUsers(response.data.listOfUsers);
        setNumberOfPages(response.data.numberOfPages);
      });
  }, [page, count, selectedFilter, sort, searchUser, statusChange]);

  useEffect(()=>{
    personService.getUpdatedStatusCount(ROLES_CODE.GOLDEN,personService.getCurrentUser.lastLogIn).then((response)=>{
      setNewGoldenUsers(response.data)
    })
    personService.getUpdatedStatusCount(ROLES_CODE.RESTRICTED,personService.getCurrentUser.lastLogIn).then((response)=>{
      setNewRestrictedUsers(response.data)
    })
  })
  return (
    <div className="userManagmentView">
      <h5>User Managment</h5>
      {showGoldenNotification && <Notification
        notificationMessage={`${newGoldenUsers}${NOTIFICATION_MESSAGES.NEW_GOLDEN_USERS} `}
        notificationType={NOTIFICATION_TYPES.GOLDEN}
        exitable={true}
        setShowNotification ={(show)=>setShowGoldenNotification(show)}
        link={newGoldenUsers > 0 ? "Take a look at them!" : ""}
      />}
      {showRestrictedNotification && <Notification
        notificationMessage={`${newRestrictedUsers}${NOTIFICATION_MESSAGES.NEW_RESTRICTED_USERS} `}
        notificationType={NOTIFICATION_TYPES.RESTRICTED}
        exitable={true}
        setShowNotification ={(show)=>setShowRestrictedNotification(show)}
        link={newRestrictedUsers > 0 ? "More them to black list!" : ""}
      ></Notification>}
      <div className="userManagmentContent">
        <div className="userManagmentOptions">
          <Filter
            selectedFilter={selectedFilter}
            changeFilter={(filter, filterIndex, selected) => {
              setSelectedFilter(filter);
              setFilterCodes(
                selected
                  ? filterCodes.concat(filterIndex)
                  : filterCodes.filter(function (value, index, arr) {
                      return value !== filterIndex;
                    })
              );
              setPage(1);
            }}
          />
          <BiSearchAlt2 className="searchIcon" />
          <input
            id="userSearch"
            className="userSearch"
            type="text"
            placeholder="Search: Users"
            value={searchUser}
            onChange={(event) => {
              setSearchUser(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="filterAndBulkAction">
          <div className="userActiveFilters">
            {Object.keys(selectedFilter).map((filter) => {
              return (
                <div>
                  {selectedFilter[filter] && (
                    <FilterBadges
                      label={filter}
                      unselect={() => unselectFilter(filter)}
                    ></FilterBadges>
                  )}
                </div>
              );
            })}
          </div>
          {selectedUsers.length !== 0 && filterCodes.length === 1 && (
            <div className="removeStatus">
              <Button
                label={REMOVE_STATUS_BUTTON[filterCodes[0]]}
                onClick={() => {
                  setOpenConfirm(true);
                }}
                buttonClass="purpleButton removeButton"
              ></Button>
            </div>
          )}
        </div>
        <div className="userTable">
          <TableHeader
            checked={checked}
            setChecked={(checked) => {
              setSelectedUsers(
                checked
                  ? users.map((user) => {
                      return user.id;
                    })
                  : []
              );
              setChecked(checked);
            }}
            setSort={(sortType) => setSort(sortType)}
          />
          {users && users.length !== 0 ? (
            users.map((user) => {
              return (
                <UserTableRow
                  user={user}
                  rowId={users.indexOf(user)}
                  checked={checked}
                  updateSelection={(select) => {
                    setSelectedUsers(
                      select
                        ? selectedUsers.concat(user.id)
                        : selectedUsers.filter(function (value, index, arr) {
                            return value !== user.id;
                          })
                    );
                  }}
                  changeStatusInTable={() => {
                    setStatusChange(statusChange + 1);
                  }}
                ></UserTableRow>
              );
            })
          ) : (
            <NoUsersFound
              filter = {filterCodes}
              onClick={() => {
                setSelectedFilter({
                  golden: false,
                  user: false,
                  black: false,
                  restricted: false,
                  archived: false,
                });
                setFilterCodes([]);
              }}
            />
          )}
        </div>
        {users.length !== 0 && (
          <div className="pagination">
            <h3>Show:</h3>
            <SortFilter
              sortId="rows"
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
        )}
        {selectedUsers.length > 0 && (
          <ConfirmDialog
            open={openConfirm}
            message={REMOVE_STATUS_MESSAGE[users[0].status.toUpperCase()]}
            onClose={() => setOpenConfirm(false)}
            onApproved={onRemoveApproved}
          ></ConfirmDialog>
        )}
      </div>
    </div>
  );
}

export default UserManagment;
