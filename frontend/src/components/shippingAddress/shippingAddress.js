import React, { useState, useEffect, useRef } from "react";
import Field from "../field/field";
import "./shippingAddress.css";
import countryService from "../../services/country.service";
import Button from "../button/button";
import { useNavigate } from "react-router";
import validation from "../../utils/validation";
import addressService from "../../services/address.service";
import { updateErrorMessage } from "../../utils/handleEvent";

function ShippingAddress(props) {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countries, setCoutries] = useState();
  const [countryId, setCountry] = useState(0);
  const [error, setError] = useState({
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  useEffect(() => {
    countryService.getAll().then((response) => {
      if (response.status === 200) setCoutries(response.data);
    });
    addressService.getAddressFromUser(props.buyer).then((response) => {
      if (response.status === 200 && response.data) {
        setAddress(response.data.street);
        setCity(response.data.city);
        setZipCode(response.data.zipCode);
        setCountry(response.data.country.id);
      }
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
          id="address"
          onChange={(e) => {
            setError(updateErrorMessage(error, "address"));
            setAddress(e.target.value);
          }}
          error={error.address}
          value={address}
        />
        <div className="cityAndZipCode">
          <Field
            placeHolder="Enter your city"
            fieldClass="loginAndRegisterField smaller"
            label="City*"
            type="text"
            id="city"
            onChange={(e) => {
              setError(updateErrorMessage(error, "city"));
              setCity(e.target.value);
            }}
            error={error.city}
            value={city}
          />
          <Field
            placeHolder="Enter your zip code"
            fieldClass="loginAndRegisterField smaller"
            label="Zip Code*"
            type="text"
            id="zipCode"
            onChange={(e) => {
              setError(updateErrorMessage(error, "zipCode"));
              setZipCode(e.target.value);
            }}
            error={error.zipCode}
            value={zipCode}
          />
        </div>
        <label>Country*</label>
        <select
          className={`countrySelector ${error.country ? "selectError" : ""}`}
          onChange={(e) => {
            setError(updateErrorMessage(error, "country"));
            setCountry(e.target.value);
          }}
          value={`${countryId}`}
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
          label="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate(-1)}
        ></Button>
        <div className="nextButton">
          <Button
            className="nextButton"
            label="NEXT"
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
