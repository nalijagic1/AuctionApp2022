import React from 'react';
import './navigationBlack.css'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'

function NavigationBlack() {

    return (
        <div className="blacknav">
            <div className="socialMedia">
            <a href="https://www.facebook.com/AtlantBH"><img src={facebook} alt = "facebook"/></a>
                    <a href="https://www.instagram.com/atlantbh/?hl=hr"><img src={instagram} alt = "instagram"/></a>
                    <a href="https://twitter.com/atlantbh"><img src={twitter} alt = "twitter"/></a>
            </div>
        </div>
    );
}

export default NavigationBlack;
