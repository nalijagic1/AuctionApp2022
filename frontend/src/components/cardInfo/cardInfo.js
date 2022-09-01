import React from "react";
import "./cardInfo.css";
import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../button/button";
import { useNavigate } from "react-router";
import { FRONTEND_URL } from "../../utils/constants";
import addressService from "../../services/address.service";
import validation from "../../utils/validation";

function CardInfo({ props, location,setError}) {
  const elements = useElements();
  const stripe = useStripe();
  const [validCard, setValidCard] = useState();
  const navigate = useNavigate();
  const [paymentError, setPaymentError] = useState();

  function saveCard() {
    if (!stripe || !elements) {
      return;
    }

    stripe
      .confirmSetup({
        elements,
        confirmParams: {
          return_url: `${FRONTEND_URL}/`,
        },
      })
      .then((result) => {
        if (result.error) console.log(result.error);
      });
  }

  function payBid() {
    if (!stripe || !elements) {
      return;
    }
    addressService.saveAddress(props.location);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${FRONTEND_URL}/paymentComplete?amount=${props.amount}&product=${props.product}`,
        },
      })
      .then((result) => {
        if (result.error) setPaymentError(result.error.message);
      });
  }
  function locationValidation() {
    let validationResult = validation.locationValidation({
      address:location.address,
      city:location.city,
      zipCode:location.zipCode,
      countryId:location.countryId,
    });
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }

  return (
    <div>
      <PaymentElement
        className="payment-element"
        onChange={(event) => setValidCard(event.complete)}
      />
      {paymentError && <p className="paymentError">{paymentError}</p>}
      <div className="navigationButtons">
        <Button
          label="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate(-1)}
        ></Button>
        <div className="optionButtons">
          <Button
            label="BACK"
            buttonClass="purpleBorder"
            onClick={() => props.previousStep()}
          />
          <Button
            label={props.payment ? `PAY ${props.amount}$` : "DONE"}
            buttonClass="purpleButton"
            onClick={() => {
              if (validCard) {
                if (props.payment) {
                  payBid();
                } else {
                  if(locationValidation()) saveCard();
                }
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
