import React from 'react';
import "./cardInfo.css"
import { useEffect } from 'react';
import {PaymentElement, useElements,useStripe } from "@stripe/react-stripe-js";

function CardInfo({changeCardData,getStripe}) {
    const elements = useElements();
    const stripe = useStripe();

    useEffect(()=>{
        getStripe(stripe);
    },[stripe])

    return (
        <div>
            <PaymentElement className="payment-element" onChange={(event)=>{changeCardData(elements,event.complete)}} />
        </div>
    );
}

export default CardInfo;;