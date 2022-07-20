import React, { useEffect, useRef } from 'react';
import './navigationWhite.css'
import logo from '../../images/auction-app-logo 1.png'
import { useNavigate } from 'react-router-dom';

function NavigationWhite() {
    let searchField = useRef();
    let navigate = useNavigate();
    const showExitButton = useRef(false);
    function search() {
        if(searchField.current.value.length === 0) {
            navigate("/shop/all");
            showExitButton.current = false;
        }
        if (searchField.current.value.length >= 3) {
            navigate("/shop?search=" + searchField.current.value);
            showExitButton.current = true;
        }
    };

    function exit() {
        searchField.current.value = "";
        search();
    }

    useEffect(() => {
        searchField.current = document.getElementById('searchField');
    }, []);

    return (
        <div className="whitenav">
            <div id="logo">
                <a href='/'>
                    <img src={logo} alt="Auction"></img>
                </a>
            </div>
            <div className='search'>
                <input id="searchField" type="text" placeholder="Search" onKeyDown={e => {
                    if (e.key.toLowerCase() === 'enter') search();
                }}>
                </input>
                {showExitButton.current &&
                        <input id="exitButton" type="submit" value="" onClick={() => exit()}/>
                }
                <input id="searchButton" type="submit" value="" onClick={search}/>
            </div>
            <div className='menu'>
                <a href='/'>HOME</a>
                <a href='/shop/all'>SHOP</a>
                <a href='/'>MY ACCOUNT</a>
            </div>
        </div>
    );
}

export default NavigationWhite;
