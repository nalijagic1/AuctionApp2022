import React, { useRef, useState } from "react";
import "./navigationWhite.css";
import logo from "../../images/auction-app-logo 1.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ROLES } from "../../utils/roles";
import personService from "../../services/person.service";

function NavigationWhite({ expanded }) {
  const user = personService.getCurrentUser();
  let navigate = useNavigate();
  const location = useLocation();
  const showExitButton = useRef(false);
  const [searchField, setSearchField] = useState("");
  const showSearchAndMenu = useRef(
    !location.pathname.includes("/login") &&
      !location.pathname.includes("/register") &&
      !location.pathname.includes("Password") &&
      !location.pathname.includes("/email")
  );
  const [displayAccountMenu, setDisplayAccountMenu] = useState();
  const MIN_WORD_LENGTH = 3;

  function search() {
    if (searchField.length === 0) {
      navigate("/shop/all");
      showExitButton.current = false;
    }
    if (searchField.length >= MIN_WORD_LENGTH) {
      navigate("/shop?search=" + searchField);
      showExitButton.current = true;
    }
  }

  function exit() {
    setSearchField("");
    search();
  }

  return (
    <div className={`whitenav ${expanded ? `compress` : ``}`}>
      <div
        id="logo"
        className={showSearchAndMenu.current ? "navHome" : "navLogIn"}
      >
        <a href="/">
          <img src={logo} alt="Auction"></img>
        </a>
      </div>
      {showSearchAndMenu.current && (
        <div className="searchAndMenu">
          <div className="search">
            <input
              id="searchField"
              type="text"
              placeholder="Search"
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === "enter") search();
                setSearchField(e.target.value);
              }}
            ></input>
            {showExitButton.current && (
              <input id="exitButton" type="submit" value="" onClick={exit} />
            )}
            <input id="searchButton" type="submit" value="" onClick={search} />
          </div>
          <div className="menu" align="right">
            {user &&
              (user.role !== ROLES.ADMIN ? (
                <div
                  className="myAccountMenu"
                  onMouseOver={() => setDisplayAccountMenu(true)}
                  onMouseOut={() => setDisplayAccountMenu(false)}
                >
                  <a href="/">MY ACCOUNT</a>
                  {displayAccountMenu && (
                    <div className="accountSubmenu">
                      <a href="/addItem">
                        {user.seller ? "Add additional item" : "Become seller"}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/">ADMIN</a>
              ))}
            <a href="/shop/all">SHOP</a>
            <a href="/">HOME</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationWhite;
