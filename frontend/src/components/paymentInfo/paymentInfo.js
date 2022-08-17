import React from 'react';
import "./paymentInfo.css"
import { Elements,PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from '../button/button';
import { useNavigate } from 'react-router';

function PaymentInfo(props) {
    const navigate = useNavigate();
    return (
        <div className="paymentInformation">
            <h5>Credit Card</h5>
            <Elements options={props.options} stripe={props.stripe}>
                <PaymentElement className="payment-element"/>
            </Elements>
            <div className='commandButtons'>
                <Button lable="CANCEL" buttonClass="cancel" onClick={() => navigate(-1)}></Button>
                <div className="moveButtons" >
                    <Button lable ="BACK" buttonClass="purpleBorder" onClick = {() => props.previousStep()}/>
                    <Button lable ="NEXT" buttonClass="purpleButton" onClick={() => props.nextStep()}></Button>
                </div>
                
            </div>
        </div>
    );
}

export default PaymentInfo;