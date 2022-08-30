import React, { useState, useEffect} from "react";
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
  const seller = personService.getCurrentUser().user;
  const [email, setEmail] = useState(seller.email);
  const [phoneNumber, setPhoneNumber] = useState(
    seller.phoneNumber ? seller.phoneNumber : ""
  );
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
            setAddress(e.target.value);
          }}
          value={address}
        />
        <Field
          placeHolder="Enter your email"
          fieldClass="loginAndRegisterField"
          label="Enter email"
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <div className="cityAndZipCode">
          <Field
            placeHolder="Enter your city"
            fieldClass="loginAndRegisterField smaller"
            label="City"
            type="text"
            id="city"
            onChange={(e) => {
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
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            value={zipCode}
          />
        </div>
        <label>Country</label>
        <br></br>
        <select
          className={`sectorCountry`}
          onChange={(e) => {
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
        <Field
          placeHolder="Enter your phone number"
          fieldClass="loginAndRegisterField"
          label="Phone number"
          type="text"
          id="phoneNumber"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          value={phoneNumber}
        />
      </form>
      <div className="sellerCardInfo">
        <Elements options={props.options} stripe={props.stripe}>
          <CardInfo props={props} location ={{address:address,city:city,zipCode:zipCode,countryId:countryId}} setError={(error) => setError(error)}/>
        </Elements>
      </div>
    </div>
  );
}

export default NewProductLocation;
