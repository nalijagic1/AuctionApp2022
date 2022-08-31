import { React } from "react";
import "./paymentInfo.css";
import { Elements } from "@stripe/react-stripe-js";
import CardInfo from "../cardInfo/cardInfo";

function PaymentInfo(props) {
  return (
    <div className="paymentInformation">
      <h5>Credit Card</h5>
      <div>
        <Elements options={props.options} stripe={props.stripe}>
          <CardInfo props={props} />
        </Elements>
      </div>
    </div>
  );
}

export default PaymentInfo;
