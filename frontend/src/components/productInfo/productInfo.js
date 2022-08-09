import React, {useEffect, useState} from 'react';
import Field from '../field/field'
import Button from '../button/button';
import './productInfo.css';
import bidService from '../../services/bid.service';
import moment from 'moment';
import personService from '../../services/person.service';
import {MdOutlineKeyboardArrowRight} from "react-icons/md"
import TooltipMessage from '../tooltipMessage/tooltipMessage';

function ProductInfo({product, showNotification}) {
    const [highestBid, setHighestBid] = useState(0);
    const [count, setCount] = useState(0);
    const [biddingEnabled, setBiddingEnabled] = useState();
    const [warningText, setWarningText] = useState("");
    const [bid, setBid] = useState();
    const [seller, setSeller] = useState(true);
    let countdown;
    const user = personService.getCurrentUser();
    if (moment(product.endingDate) <= moment.now()) {
        countdown = "This auction has ended!";
    } else {
        countdown = moment(product.endingDate).fromNow(true);
    }

    function placeBid() {
        if (highestBid >= bid) {
            showNotification('warning', "There are higher bids than yours. You could give a second try!")
        } else {
            bidService.placeBid(user.user.id, product.id, bid).then((response) => {
                if (response.data.includes('Succesful')) {
                    showNotification('success', "Congrats! You are the highest bider!");
                }
            })
        }
    }

    useEffect(() => {
        if (user) {
            if (user.user.id === product.person.id) {
                setSeller(false);
            } else setSeller(true);
            setBiddingEnabled("");
        } else {
            setBiddingEnabled('disabled');
            setWarningText("Please login or register to place a bid.");
        }
        if (countdown === "This auction has ended!") setSeller(false);
        bidService.getBidCount(product.id).then(
            (response) => {
                setCount(response.data);
            }
        )
        bidService.getHighestBid(product.id).then(
            (response) => {
                if (response.data.length === 0) {
                    setHighestBid(product.startingPrice);
                } else {
                    setHighestBid(response.data.bid);
                    if (user && response.data.person.id === user.user.id) {
                        setBiddingEnabled('disabled');
                        setWarningText("You cannot outbid yourself");
                    }
                }
            }
        )

    }, [product, user])

    return (
        <div className="info">
            <h2>{product.name}</h2>
            <h3>Start with <p>${product.startingPrice}</p></h3>
            <div className='biddingInfo'>
                <h3>Highest bid: <p>${highestBid}</p></h3>
                <h3>Number of bids: <p>{count}</p></h3>
                {moment(product.endingDate) > moment.now() && <h3>Time left: <p>{countdown}</p></h3>}
            </div>
            {seller &&
            <TooltipMessage className="" title={warningText == null ? "" : warningText} placement="top-end" arrow>
                <div className='bid'>
                    <Field placeHolder={`Enter $${highestBid + 1} or higher`} fieldClass={`placeBid ${biddingEnabled}`}
                           id="placeBid" type="number" onKeyUp={(event) => setBid(event.target.value)}/>
                    <Button lable="Place bid"
                            icon={<MdOutlineKeyboardArrowRight className='buttonIcon' viewBox='none'/>}
                            buttonClass={biddingEnabled + "Button"} onClick={() => placeBid()}/>
                </div>
            </TooltipMessage>
            }
            <div className="desc">
                <h3>Details</h3>
            </div>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductInfo;
