import React from 'react';
import './navigationBlack.css'
import facebook from '../../images/facebook.png' 
import instagram from '../../images/instagram.png' 
import twitter from '../../images/twitter.png' 

function NavigationBlack() {

  return(
    <div className="blacknav">
      <div className="socialMedia">
          <a href="https://www.facebook.com/AtlantBHh" target="_blank"><img src={facebook}/></a>
          <a href="https://www.instagram.com/atlantbh/?hl=hr" target="_blank"><img src={instagram}/></a>
          <a href="https://twitter.com/atlantbh" target="_blank"><img src={twitter}/></a>
      </div> 
    </div>
  );
}

export default NavigationBlack;
