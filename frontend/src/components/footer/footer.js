import React from "react";
import facebook from '../../images/facebook.png' 
import instagram from '../../images/instagram.png' 
import twitter from '../../images/twitter.png' 
import "./footer.css"

function Footer() {

    return(
      <div className="footer">
            <div className="links">
                <h1>AUCTION</h1>
                <a href="/aboutUs">About us</a>
                <br/>
                <a href = "/terms">Terms and conditions</a>
                <br/>
                <a href="/privacy">Privacy and policy</a>
            </div>
            <div className="contact">
                <h1>GET IN TOUCH</h1>
                <p>Call us at +123 797-567-2535</p>
                <p>support@auction.com</p>
                <div>
                    <img src={facebook}/>
                    <img src={instagram}/>
                    <img src={twitter}/>
                </div>
            </div>
      </div>
    );
  }
  
  export default Footer;
  
  