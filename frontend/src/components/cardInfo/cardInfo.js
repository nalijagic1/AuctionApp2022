import React from 'react';
import "./cardInfo.css"
import { Elements,PaymentElement, useElements } from "@stripe/react-stripe-js";
import Button from '../button/button';
import { useNavigate } from 'react-router';

function CardInfo({changeCardData}) {
    const elements = useElements();
    return (
        <div>
            <PaymentElement className="payment-element" onChange={()=>changeCardData(elements)}/>
        </div>
    );
}

export default CardInfo;