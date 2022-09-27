import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/filter";
import "./userManagement.css";
import { BiSearchAlt2 } from "react-icons/bi";
import TableHeader from "../../components/tableHeader/tableHeader";
import UserTableRow from "../../components/userTableRows/userTableRows";
import AuctionPagination from "../../components/auctionPagination/auctionPagination";
import personService from "../../services/person.service";
import SortFilter from "../../components/sortFilter/sortFilter";
import FilterBadges from "../../components/filterBadges/filterBadges";
import {
  REMOVE_STATUS_BUTTON,
  ROLES_CODE,
  STATUS_REASONS,
} from "../../utils/roles";

import { DIALOG_TYPE, DIALOG_CONTENT } from "../../utils/dialog";
import NoUsersFound from "../../components/noUsersFound/noUsersFound";
import Button from "../../components/button/button";
import PopUpDialog from "../../components/popUpDialog/popUpDialog";
import Notification from "../../components/notification/notification";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPES,
} from "../../utils/notificationConstants";
import PathBar from "../../components/pathBar/pathBar";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/loader/loader";

function UserManagement() {
  const query = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState(false);
  const userFilter = query.get("user");
  const navigate = useNavigate();
  var viewedUsers;
  if (userFilter) viewedUsers = false;
  const [searchUser, setSearchUser] = useState("");
  const [newGoldenUsers, setNewGoldenUsers] = useState(0);
  const [newRestrictedUsers, setNewRestrictedUsers] = useState(0);
  const [showGoldenNotification, setShowGoldenNotification] = useState(true);
  const [showRestrictedNotification, setShowRestrictedNotification] =
    useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState();
  const [sort, setSort] = useState({ field: "id", direction: "ASC" });
  const [checked, setChecked] = useState(false);
  const [filterCodes, setFilterCodes] = useState(
    userFilter ? [ROLES_CODE[userFilter.toUpperCase()]] : []
  );
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

  const [columns, setColumns] = useState({
    Name: true,
    "Date of creation": true,
    "Mobile number": true,
    Email: true,
    Location: true,
    Status: true,
    "Status update": true,
  });
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
  function markAsViewed() {
    personService.updateViewedStatus(
      true,
      ROLES_CODE[userFilter.toUpperCase()]
    );
    navigate("/userManagement");
  }
  function onRemoveApproved() {
    personService
      .updateStatus(selectedUsers, ROLES_CODE.USER, STATUS_REASONS.REGULAR)
      .then(() => {
        setSelectedUsers([]);
        setChecked(false);
        setStatusChange(statusChange + 1);
        setOpenConfirm(false);
        
      });
  }
  useEffect(() => {
    setLoading(true)
    personService
      .getAllUsers(page - 1, count, filterCodes, sort, searchUser, viewedUsers)
      .then((response) => {
        setUsers(response.data.listOfUsers);
        setNumberOfPages(response.data.numberOfPages);
        setLoading(false);
      });
  }, [page, count, filterCodes, sort, searchUser, statusChange]);

  useEffect(() => {
    personService.getUpdatedStatusCount(ROLES_CODE.GOLDEN).then((response) => {
      setNewGoldenUsers(response.data);
    });
    personService
      .getUpdatedStatusCount(ROLES_CODE.RESTRICTED)
      .then((response) => {
        setNewRestrictedUsers(response.data);
      });
  });
  return (
    <div className="userManagmentView">
      {userFilter && (
        <PathBar
          prop={{
            name: "",
            startPoint: "User Management",
            endPoint: `Golden list`,
            onClick: () => markAsViewed(),
          }}
        ></PathBar>
      )}
      <h5 className={userFilter && "goldenTitle"}>
        {userFilter === "golden" ? "Golden Users" : "User Management"}
      </h5>
      {!userFilter && (
        <div>
          {showGoldenNotification && (
            <Notification
              notificationMessage={`${newGoldenUsers}${NOTIFICATION_MESSAGES.NEW_GOLDEN_USERS} `}
              notificationType={NOTIFICATION_TYPES.GOLDEN}
              exitable={true}
              setShowNotification={(show) => setShowGoldenNotification(show)}
              linkText={newGoldenUsers > 0 ? "Take a look at them!" : ""}
              link="/userManagement?user=golden"
            />
          )}
          {showRestrictedNotification && (
            <Notification
              notificationMessage={`${newRestrictedUsers}${NOTIFICATION_MESSAGES.NEW_RESTRICTED_USERS} `}
              notificationType={NOTIFICATION_TYPES.RESTRICTED}
              exitable={true}
              setShowNotification={(show) =>
                setShowRestrictedNotification(show)
              }
              link={newRestrictedUsers > 0 ? "Move them to black list!" : ""}
            ></Notification>
          )}
        </div>
      )}
      <div className="userManagmentContent">
        <div className="userManagmentOptions">
          <Filter
            selectedFilter={selectedFilter}
            changeFilter={(filter, filterIndex, selected) => {
              if (userFilter) navigate("/userManagement");
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
          {selectedUsers.length !== 0 &&
            filterCodes.length === 1 &&
            filterCodes[0] !== 1 &&
            filterCodes[0] !== 5 && (
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
            columns={columns}
            changeHeaderView={(column) => {
              setColumns(column);
            }}
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
          {loading ? (
            <Loader></Loader>
          ) : (
            <div>
              {" "}
              {users && users.length !== 0 ? (
                users.map((user) => {
                  return (
                    <UserTableRow
                      columns={columns}
                      user={user}
                      rowId={users.indexOf(user)}
                      checked={checked}
                      updateSelection={(select) => {
                        setSelectedUsers(
                          select
                            ? selectedUsers.concat(user.id)
                            : selectedUsers.filter(function (
                                value,
                                index,
                                arr
                              ) {
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
                  filter={filterCodes}
                  onClick={() => {
                    if (userFilter) {
                      markAsViewed();
                    } else {
                      setSelectedFilter({
                        golden: false,
                        user: false,
                        black: false,
                        restricted: false,
                        archived: false,
                      });
                      setFilterCodes([]);
                    }
                  }}
                />
              )}
            </div>
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
          <PopUpDialog
            type={DIALOG_TYPE.CONFIRM}
            open={openConfirm}
            message={DIALOG_CONTENT[users[0].status.toUpperCase()]}
            onClose={() => setOpenConfirm(false)}
            onApproved={onRemoveApproved}
          ></PopUpDialog>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
