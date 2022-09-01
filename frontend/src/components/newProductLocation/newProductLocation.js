import React, { useState, useEffect } from "react";
import Field from "../field/field";
import "./newProductLocation.css";
import countryService from "../../services/country.service";
import addressService from "../../services/address.service";
import personService from "../../services/person.service";
import { Elements } from "@stripe/react-stripe-js";
import CardInfo from "../cardInfo/cardInfo";

function NewProductLocation(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countries, setCoutries] = useState();
  const [countryId, setCountry] = useState(0);
  const seller = personService.getCurrentUser();
  const [email, setEmail] = useState(seller.email);
  const [phoneNumber, setPhoneNumber] = useState(
    seller.phoneNumber ? seller.phoneNumber : ""
  );
  const [error, setError] = useState({
    address: "",
    email: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    country: "",
  });
  function updateErrorMessage(errorField) {
    setError((data) => {
      var error = { ...data };
      error[errorField] = "";
      return error;
    });
  }

  useEffect(() => {
    countryService.getAll().then((response) => {
      if (response.status === 200) setCoutries(response.data);
    });
    addressService.getAddressFromUser(seller.id).then((response) => {
      if (response.status === 200 && response.data) {
        setAddress(response.data.street);
        setCity(response.data.city);
        setZipCode(response.data.zipCode);
        setCountry(response.data.country.id);
      }
    });
  }, []);

  return (
    <div className="newProductAddress">
      <h5>LOCATION AND SHIPPING</h5>
      <form className="productLocationInfo">
        <Field
          placeHolder="Enter your address"
          fieldClass="loginAndRegisterField"
          label="Address"
          type="text"
          id="addrss"
          onChange={(e) => {
            updateErrorMessage("address");
            setAddress(e.target.value);
          }}
          value={address}
          error={error.address}
          readOnly={false}
        />
        <Field
          placeHolder="Enter your email"
          fieldClass="loginAndRegisterField"
          label="Enter email"
          type="text"
          id="email"
          onChange={(e) => {
            updateErrorMessage("email");
            setEmail(e.target.value);
          }}
          value={email}
          error={error.email}
          readOnly={true}
        />
        <div className="cityAndZipCode">
          <Field
            placeHolder="Enter your city"
            fieldClass="loginAndRegisterField smaller"
            label="City"
            type="text"
            id="city"
            error={error.city}
            onChange={(e) => {
              updateErrorMessage("city");
              setCity(e.target.value);
            }}
            value={city}
          />
          <Field
            placeHolder="Enter your zip code"
            fieldClass="loginAndRegisterField smaller"
            label="Zip Code"
            type="text"
            id="zipCode"
            error={error.zipCode}
            onChange={(e) => {
              updateErrorMessage("zipCode");
              setZipCode(e.target.value);
            }}
            value={zipCode}
          />
        </div>
        <label>Country</label>
        <br></br>
        <select
          className={`sectorCountry ${error.country ? "selectError" : ""}`}
          onChange={(e) => {
            updateErrorMessage("country");
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
        <Field
          placeHolder="Enter your phone number"
          fieldClass="loginAndRegisterField"
          label="Phone number"
          type="text"
          id="phoneNumber"
          error={error.phoneNumber}
          onChange={(e) => {
            updateErrorMessage("phoneNumber");
            setPhoneNumber(e.target.value);
          }}
          value={phoneNumber}
        />
      </form>
      <div className="sellerCardInfo">
        <Elements options={props.options} stripe={props.stripe}>
          <CardInfo
            props={props}
            location={{
              address: address,
              email: email,
              city: city,
              zipCode: zipCode,
              countryId: countryId,
              phoneNumber: phoneNumber,
            }}
            setError={(error) => setError(error)}
          />
        </Elements>
      </div>
    </div>
  );
}

export default NewProductLocation;
