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
import { STATUS_CODES } from "../../utils/httpStatusCode";
import productService from "../../services/product.service";
import personService from "../../services/person.service";
import pictureService from "../../services/picture.service";

function CardInfo({ props, location, setError }) {
  const elements = useElements();
  const stripe = useStripe();
  const [validCard, setValidCard] = useState();
  const navigate = useNavigate();
  const [paymentError, setPaymentError] = useState();
  const seller = personService.getCurrentUser();

  function saveCard(newProductId) {
    if (!stripe || !elements) {
      return;
    }

    stripe
      .confirmSetup({
        elements,
        confirmParams: {
          return_url: `${FRONTEND_URL}/product/${newProductId}`,
        },
      })
      .then((result) => {
        if (result.error) setPaymentError(result.error.message);
      });
  }

  async function savePhotos(photo) {
    var imageURL = [];
    for (var i = 0; i < photo.length; i++) {
      var photoUrl = await pictureService.saveImageOnCloudinary(photo[i]);
      imageURL.push(photoUrl);
    }
    return imageURL;
  }

  function saveProduct() {
    addressService
      .saveAddress({
        address: location.address,
        city: location.city,
        zipCode: location.zipCode,
        countryId: location.countryId,
      })
      .then((response) => {
        if (response.status === STATUS_CODES.OK) {
          savePhotos(props.productInfo.pictures).then((imageUrl) => {
            productService
              .addProduct(
                props.productInfo.productName,
                props.productInfo.description,
                props.productInfo.subcategoryId,
                seller.id,
                props.priceDetails.startingPrice,
                props.priceDetails.startingDate,
                props.priceDetails.endingDate,
                imageUrl,
                response.data,
                location.phoneNumber
              )
              .then((addResponse) => {
                if (addResponse.status === STATUS_CODES.OK)
                  saveCard(addResponse.data.id);
              });
          });
        }
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
  function validate() {
    let validationResult = validation.locationValidation({
      address: location.address,
      email: location.email,
      city: location.city,
      zipCode: location.zipCode,
      countryId: location.countryId,
      phoneNumber: location.phoneNumber,
    });
    setError(validationResult.errorMessages);
    if (!validCard) setPaymentError("Please input valid card information");
    return validationResult.valid && validCard;
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
          buttonClass="grayBorder"
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
              if (props.payment) {
                if (validCard) payBid();
                else setPaymentError("Please input valid card information");
              } else {
                if (validate()) saveProduct();
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
