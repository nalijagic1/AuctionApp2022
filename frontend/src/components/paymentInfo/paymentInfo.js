import { React, useState } from "react";
import "./paymentInfo.css";
import { Elements } from "@stripe/react-stripe-js";
import Button from "../button/button";
import { useNavigate } from "react-router";
import CardInfo from "../cardInfo/cardInfo";

function PaymentInfo(props) {
  const navigate = useNavigate();
  const [cardInformatio, setCardInformation] = useState();
  const [validCard, setValidCard] = useState(false);
  return (
    <div className="paymentInformation">
      <h5>Credit Card</h5>
      <Elements options={props.options} stripe={props.stripe}>
        <CardInfo
          changeCardData={(cardData, validData) => {
            setCardInformation(cardData);
            setValidCard(validData);
          }}
        />
      </Elements>
      <div className="commandButtons">
        <Button
          lable="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate(-1)}
        ></Button>
        <div className="moveButtons">
          <Button
            lable="BACK"
            buttonClass="purpleBorder"
            onClick={() => props.previousStep()}
          />
          <Button
            lable="NEXT"
            buttonClass="purpleButton"
            onClick={() => {
              if (validCard) props.nextStep();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
