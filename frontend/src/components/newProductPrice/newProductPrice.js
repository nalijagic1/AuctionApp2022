import Field from "../field/field";
import { React, useState, useEffect } from "react";
import Button from "../button/button";
import { useNavigate } from "react-router-dom";
import "./newProductPrice.css";
import moment from "moment";
import validation from "../../utils/validation";

function NewProductPrice(props) {
  const navigate = useNavigate();
  const [price, setPrice] = useState();
  const [startDate, setStartDate] = useState(moment().format("yyyy-MM-DD"));
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState({
    price: "",
    date: "",
  });
  function dataValidation() {
    let validationResult = validation.validateProductDetails({
      price: price,
      date: { startDate: startDate, endDate: endDate },
    });
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }
  return (
    <div className="newProductPrice">
      <h5>SET PRICES</h5>
      <div className="priceInfo">
        <div>
          <label>Your start price*</label>
          <input
            className="startPrice"
            type="number"
            placeholder="Enter your starting price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="currency">$</div>
        </div>
        <p className="errorMessage">{error.price}</p>
        <div className="auctionDates">
          <Field
            type="date"
            fieldClass="loginAndRegisterField smaller"
            label="Start date*"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          <Field
            type="date"
            fieldClass="loginAndRegisterField smaller"
            label="End date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <p className="errorMessage">{error.date}</p>
        <p className="infoMessages">
          The auction will be automatically closed when the end time comes. The
          highest bid will win the auction.
        </p>
        <p className="infoMessages">Mandatory fields are marked with * </p>
      </div>
      <div className="buttonLayout">
        <Button
          label="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate("/")}
        ></Button>
        <div className="movementButtons">
          <Button
            label="BACK"
            buttonClass="purpleBorder"
            onClick={() => props.previousStep()}
          />
          <Button
            label={`NEXT`}
            buttonClass="purpleButton"
            onClick={() => {
              if (dataValidation()) {
                props.setPriceInfo({
                  startingPrice: price,
                  startingDate: startDate,
                  endingDate: endDate,
                });
                props.nextStep();
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default NewProductPrice;
