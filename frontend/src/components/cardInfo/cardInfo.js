import React from 'react';
import "./cardInfo.css"
import {PaymentElement, useElements } from "@stripe/react-stripe-js";

function CardInfo({changeCardData}) {
    const elements = useElements();
    return (
        <div>
            <PaymentElement className="payment-element" onChange={(event)=>{changeCardData(elements,event.complete)}} />
        </div>
    );
}

export default CardInfo;;