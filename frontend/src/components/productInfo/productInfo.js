import React, {useEffect, useState} from 'react';
import Field from '../field/field'
import Button from '../button/button';
import arrow from '../../images/arrow.png';
import './productInfo.css';
import bidService from '../../services/bid.service';
import moment from 'moment';
import personService from '../../services/person.service';
import {MdOutlineKeyboardArrowRight} from "react-icons/md"

function ProductInfo({product}) {
    const [highestBid, setHighestBid] = useState(0);
    const [count, setCount] = useState(0);
    const [biddingEnabled,setBiddingEnabled] = useState();
    let countdown;
    const user = personService.getCurrentUser();
    if (moment(product.endingDate) <= moment.now()) {
        countdown = "This auction has ended!";
    } else {
        countdown = moment(product.endingDate).fromNow(true);
    }
    useEffect(() => {
        if(user){
            setBiddingEnabled("");
        }else{
            setBiddingEnabled('disabled');
        }
        bidService.getBidCount(product.id).then(
            (response) => {
                setCount(response.data);
            }
        )
        bidService.getHighestBid(product.id).then(
            (response) => {
                if (response.data.length === 0) {
                    setHighestBid(product.startingPrice);
                } else setHighestBid(response.data.bid);
            }
        )

    }, [product])

    return (
        <div className="info">
            <h2>{product.name}</h2>
            <h3>Start with <p>${product.startingPrice}</p></h3>
            <div className='biddingInfo'>
                <h3>Highest bid: <p>${highestBid}</p></h3>
                <h3>Number of bids: <p>{count}</p></h3>
                <h3>Time left: <p>{countdown}</p></h3>
            </div>
            <div className='bid'>
                <Field placeHolder={`Enter $${highestBid + 1} or higher`} fieldClass = {`placeBid ${biddingEnabled}`} id ="placeBid" type = "text"/>
                <Button lable="Place bid" icon={<MdOutlineKeyboardArrowRight className='buttonIcon' viewBox='none'/>} buttonClass={biddingEnabled+"Button"}/>
            </div>
            <div className="desc">
                <h3>Details</h3>
            </div>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductInfo;
