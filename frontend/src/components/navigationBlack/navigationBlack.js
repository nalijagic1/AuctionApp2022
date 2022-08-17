import React from 'react';
import './navigationBlack.css'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'
import personService from '../../services/person.service';

function NavigationBlack() {
    const user = JSON.parse(localStorage.getItem('user'));

    function logOut() {
        personService.logout().then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="blacknav">
            <div className="socialMedia">
                <a href="https://www.facebook.com/AtlantBH"><img src={facebook} alt="facebook" /></a>
                <a href="https://www.instagram.com/atlantbh/?hl=hr"><img src={instagram} alt="instagram" /></a>
                <a href="https://twitter.com/atlantbh"><img src={twitter} alt="twitter" /></a>
            </div>
            <div className='user'>
                {user ? <a href="/" onClick={() => logOut()}>Logout</a> : <div>
                    <a href='/login'>Log in</a>
                    <h1>or</h1>
                    <a href='/register'>Create an account</a>
                </div>}
            </div>
        </div>
    );
}

export default NavigationBlack;
