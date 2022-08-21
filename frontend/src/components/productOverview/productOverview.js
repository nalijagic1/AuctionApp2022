import React from "react";
import Dropdown from "../dropdown/dropdown";
import "./paymentOverview.css";
import Button from "../button/button";
import { useNavigate } from "react-router-dom";
import Checkbox from "../checkbox/checkbox";
import AuctionItem from "../auctionItem/auctionItem";
function PaymentOverview(props) {
  const navigate = useNavigate();
  return (
    <div className="paymentOverview">
      <h5>REVIEW AND CONFIRM PAYMENT</h5>
      <div className="reviewContent">
        <Dropdown title="Shipping Address" content={[<p>Uslo</p>]} />
        {props.location && (
          <Dropdown
            title="Shipping Address"
            content={[
              <p>{props.location.address}</p>,
              <p>{props.location.city}</p>,
              <p>{props.location.country}</p>,
              <p>{props.location.zipCode}</p>,
              <p className="change" onClick={() => props.goToStep(1)}>
                Change
              </p>,
            ]}
          />
        )}
        <Dropdown title="Credit card" content="" />
      </div>
      <div className="auctionContent">
        <AuctionItem productId={props.product} amount={props.amount} />
      </div>
      <div className="readTerms">
        <Checkbox
          label={[
            "I confirm that I have read and accepted Auction’s ",
            <a href="/terms">terms and conditions</a>,
          ]}
        ></Checkbox>
      </div>
      <div className="navigationButtons">
        <Button
          lable="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate(-1)}
        ></Button>
        <div className="optionButtons">
          <Button
            lable="BACK"
            buttonClass="purpleBorder"
            onClick={() => props.previousStep()}
          />
          <Button
            lable={`Pay $${props.amount}`}
            buttonClass="purpleButton"
            onClick={() =>
              navigate("/paymentComplete", {
                state: { product: props.product, amount: props.amount },
              })
            }
          ></Button>
        </div>
      </div>
    </div>
  );
}
export default PaymentOverview;
