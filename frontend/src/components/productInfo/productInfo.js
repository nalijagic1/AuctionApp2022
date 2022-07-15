import React, {useEffect, useState} from 'react';
import Field from '../field/field'
import Button from '../button/button';
import arrow from '../../images/arrow.png'
import './productInfo.css'
import Countdown from 'react-countdown';
import bidService from '../../services/bid.service';

function ProductInfo({product}) {
    const [highestBid, setHighestBid] = useState(0);
    const [count, setCount] = useState(0);
    const diferece = new Date(product.endingDate);
    useEffect(() => {
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

    }, [product]);

    function renderDate({days, hours, minutes, seconds, completed}) {
        if (completed) {
            return <span>This auction has ended!</span>;
        } else {
            var countdown = "";
            if (days.toString() !== "0") countdown += days + " days ";
            countdown += hours + " hours " + minutes + " minutes " + seconds + " seconds";
            return <span>{countdown}</span>;
        }
    }

    return (
        <div className="info">
            <h2>{product.name}</h2>
            <h3>Start with <p>${product.startingPrice}</p></h3>
            <div className='biddingInfo'>
                <h3>Highest bid: <p>${highestBid}</p></h3>
                <h3>Number of bids: <p>{count}</p></h3>
                <h3>Time left: <p><Countdown date={Date.now() + (diferece.getTime() - Date.now())}
                                             renderer={renderDate}/></p></h3>
            </div>
            <div className='bid'>
                <Field placeHolder={`Enter $${highestBid + 1} or higher`}/>
                <Button lable="Place bid" icon={arrow}/>
            </div>
            <div className="desc">
                <h3>Details</h3>
            </div>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductInfo;
