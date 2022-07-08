import React, { useEffect, useState } from 'react';
import Field from '../field/field'
import Button from '../button/button';
import arrow from '../../images/arrow.png'
import './productInfo.css'
import bidService from '../../services/bid.service';
import moment from 'moment';
function ProductInfo({product}) {
    const[highestBid,setHighestBid] = useState([]);
    const[count,setCount] = useState(0);
    const diferece = moment().diff(moment(product.endingDate,'YYYY-MM-DD'))
    var duration = moment.duration(diferece)
    useEffect(() => {
        bidService.getHighestBid(product.id).then(
            (response)=>{
                setHighestBid(response.data);
            }
            
        )
        bidService.getBidCount(product.id).then(
            (response)=>{
                setCount(response.data);
            }
            
        )
      }, []);
  return(
    <div className="info">
      <h2>{product.name}</h2>
      <h3>Start with <a>${product.startingPrice}</a></h3>
      <div className='biddingInfo'> 
           <h3>Highest bid: <a>${highestBid.bid}</a></h3> 
           <h3>Number of bids: <a>{count}</a></h3>
           <h3>Time left: <a>{duration.humanize()}</a></h3>
      </div>
      <div className='bid'>
        <Field placeHolder={`Enter $${highestBid.bid+1} or higher`}/>
        <Button lable ="Place bid" icon={arrow}/>
      </div>
      <div className="desc">
        <h3>Details</h3>
      </div>
      <p>{product.description}</p>
     </div>
  );
}

export default ProductInfo;