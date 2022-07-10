import React from "react";
import './aboutUs.css'
import photoOne from "../../images/about1.png"
import photoTwo from "../../images/about2.png"
import photoThree from "../../images/about3.png"
import PathBar from "../../components/pathBar/pathBar";

function AboutUs() {
    return (
        <div>
            <PathBar prop={{name: "About Us", startPoint: "Home", endPoint: "About us"}}/>
            <div className="us">
                <div className="aboutText">
                    <h2>About Us</h2>
                    <p>Welcome to our website! Auction, is a professional platform where we provide informative content
                        like products on auctions. We hope you like all the contents provided by us.If you have
                        additional questions or require more information about our website, do not hesitate to Contact
                        through email at auction@gmail.com</p>
                    <p>This website founded in 2022 by Nađa Alijagić. Also, Auction commits to reply to all people who
                        subscribe to the YouTube Channel and Follow the our website. We hope you enjoy Our services as
                        much as we enjoy offering them to you. Sincerely, Auction</p>
                    <p>Like any other website, We want viewers to enhance their skills with the help of our contents. We
                        will continue to provide helpful content to you like this.</p>
                    <p>Our About-us page was created with the help of the <a
                        href="https://aboutuspagegenerate.blogspot.com/">About Us Generator Tool</a></p>
                    <p>We are a leading online learning platform, guiding viewers to identify their strengths and fill
                        in their learning gaps.We are working to turn our passion of Auction into a growing online
                        website. If you have any question or query regarding our website, Please don't hesitate to
                        contact us.</p>
                    <p>Thanks For Visiting Our Site </p>
                </div>
                <div className="aboutImg">
                    <img src={photoOne}/>
                    <div className="inline">
                        <img src={photoTwo}/>
                        <img src={photoThree}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AboutUs;
