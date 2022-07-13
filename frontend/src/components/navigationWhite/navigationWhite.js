import {React, useEffect} from 'react';
import './navigationWhite.css'
import logo from '../../images/auction-app-logo 1.png'


function NavigationWhite() {
    useEffect(() => {
        const searchField =  document.getElementById('searchField');
        searchField.addEventListener("keypress",(e)=>{
            if(e.key.toLowerCase() === 'enter'){
                console.log(searchField.value)
                if(searchField.value.length >= 3)window.location.assign("/shop")
            }
        })
    },[]);

    return (
        <div className="whitenav">
            <div id="logo">
                <a href='/'>
                    <img src={logo} alt="Auction"></img>
                </a>
            </div>
            <div className='search'>
                <input id = "searchField" type="text" placeholder="Search"></input>
                <input type="submit" value="" />
            </div>
            <div className='menu'>
                <a href = '/'>HOME</a>
                <a href = '/'>SHOP</a>
                <a href = '/'>MY ACCOUNT</a>
            </div>
        </div>
    );
}

export default NavigationWhite;
