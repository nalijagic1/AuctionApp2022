import React, {useRef,useState } from "react";
import "./navigationWhite.css";
import logo from "../../images/auction-app-logo 1.png";
import { useNavigate, useLocation } from "react-router-dom";

function NavigationWhite() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const location = useLocation();
  const showExitButton = useRef(false);
  const [searchField,setSearchField] = useState("");
  const showSearchAndMenu = useRef(
    location.pathname.includes("/login") ||
      location.pathname.includes("/register")
      ? false
      : true
  );

  function search() {
    if (searchField.length === 0) {
      navigate("/shop/all");
      showExitButton.current = false;
    }
    if (searchField.length >= 3) {
      navigate("/shop?search=" + searchField);
      showExitButton.current = true;
    }
  }

  function exit() {
    setSearchField("");
    search();
  }

  return (
    <div className="whitenav">
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
                console.log(searchField);
                if (e.key.toLowerCase() === "enter") search();
                setSearchField(e.target.value)
              }}
            ></input>
            {showExitButton.current && (
              <input id="exitButton" type="submit" value="" onClick={exit} />
            )}
            <input id="searchButton" type="submit" value="" onClick={search} />
          </div>
          <div className="menu" align="right">
            {user && <a href="/">MY ACCOUNT</a>}
            <a href="/shop/all">SHOP</a>
            <a href="/">HOME</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationWhite;
