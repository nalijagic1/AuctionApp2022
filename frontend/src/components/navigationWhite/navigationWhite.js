import React from 'react';
import './navigationWhite.css'
import logo from '../../images/auction-app-logo 1.png' 


function NavigationWhite() {

  return(
    <div className="whitenav">
      <div id="logo">
        <a href='/'>
          <img  src={logo} ></img>
        </a>
      </div>
      <div className='search'>
        <input type="text" value="Search"></input>
        <input  type="submit" value=""/>
      </div>
      <div className='menu'>
        <a href='#'>HOME</a>
        <a href='#'>SHOP</a>
        <a href="#">MY ACCOUNT</a>
      </div> 
    </div>
  );
}

export default NavigationWhite;