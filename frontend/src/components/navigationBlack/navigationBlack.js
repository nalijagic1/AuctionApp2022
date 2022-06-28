import React from 'react';
import './navigationBlack.css'
import facebook from '../../images/facebook.png' 
import instagram from '../../images/instagram.png' 
import twitter from '../../images/twitter.png' 

function NavigationBlack() {

  return(
    <div className="blacknav">
      <div className="socialMedia">
        <img src={facebook}/>
        <img src={instagram}/>
        <img src={twitter}/>
      </div> 
    </div>
  );
}

export default NavigationBlack;
