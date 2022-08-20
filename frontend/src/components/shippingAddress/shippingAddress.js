import React, { useState, useEffect } from "react";
import Field from "../field/field";
import "./shippingAddress.css";
import countryService from "../../services/country.service";
import Button from "../button/button";
import { useNavigate } from "react-router";
import validation from "../../utils/validation";

function ShippingAddress(props) {
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [countries, setCoutries] = useState();
  const [countryId, setCountry] = useState();
  const [error, setError] = useState({
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  useEffect(() => {
    countryService.getAll().then((response) => {
      setCoutries(response.data);
    });
  }, []);

  function locationValidation() {
    let validationResult = validation.locationValidation({
      address,
      city,
      zipCode,
      countryId,
    });
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }
  return (
    <div className="shippingAddress">
      <h5>SHIPPING ADDRESS</h5>
      <form>
        <Field
          placeHolder="Enter your address"
          fieldClass="loginAndRegisterField"
          label="Address*"
          type="text"
          id="addrss"
          onKeyUp={(e) => {
            setError({
              address: "",
              city: error.city,
              zipCode: error.zipCode,
              country: error.country,
            });
            setAddress(e.target.value);
          }}
          error={error.address}
        />
        <div className="cityAndZipCode">
          <Field
            placeHolder="Enter your city"
            fieldClass="loginAndRegisterField smaller"
            label="City*"
            type="text"
            id="city"
            onKeyUp={(e) => {
              setError({
                address: error.address,
                city: "",
                zipCode: error.zipCode,
                country: error.country,
              });
              setCity(e.target.value);
            }}
            error={error.city}
          />
          <Field
            placeHolder="Enter your zip code"
            fieldClass="loginAndRegisterField smaller"
            label="Zip Code*"
            type="text"
            id="zipCode"
            onKeyUp={(e) => {
              setError({
                address: error.address,
                city: error.city,
                zipCode: "",
                country: error.country,
              });
              setZipCode(e.target.value);
            }}
            error={error.zipCode}
          />
        </div>
        <label>Country*</label>
        <select
          className={`countrySelector ${error.country ? "selectError" : ""}`}
          onChange={(e) => {
            setError({
              address: error.address,
              city: error.city,
              zipCode: error.zipCode,
              country: "",
            });
            setCountry(e.target.value);
          }}
          defaultValue="0"
        >
          <option key="0" value="0" disabled>
            Select your country
          </option>
          {countries &&
            countries.map((country) => {
              return (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              );
            })}
        </select>
        {error.country && <p className="errorCountry">{error.country}</p>}
      </form>
      <p className="mandatory">Mandatory fields are marked with *</p>
      <div className="menuButtons">
        <Button
          lable="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate(-1)}
        ></Button>
        <div className="nextButton">
          <Button
            className="nextButton"
            lable="NEXT"
            buttonClass="purpleButton"
            onClick={() => {
              if (locationValidation()) {
                props.rememberLocation({ address, city, zipCode, countryId });
                props.nextStep();
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
