import React, {useState, useEffect, useRef} from 'react';
import Field from '../field/field';
import './shippingAddress.css'
import countryService from '../../services/country.service';
import Button from '../button/button';
import { useNavigate } from 'react-router';

function ShippingAddress(props) {
    const [address,setAddress] = useState();
    const navigate = useNavigate();
    const [city,setCity] = useState();
    const [zipCode,setZipCode] = useState();
    const [countries,setCoutries] = useState();
    const [country,setCountry] = useState();
    useEffect(() => {
        countryService.getAll().then((response)=>{
            setCoutries(response.data)
        })
    }, [])
    return (
        <div className="shippingAddress">
            <h5>SHIPPING ADDRESS</h5>
            <form>
                <Field placeHolder="Enter your address"  fieldClass ="loginAndRegisterField" label="Address*" type="text" id="addrss" onKeyUp={e => setAddress(e.target.value)}/>
                <div className='cityAndZipCode'>
                <Field placeHolder="Enter your city"  fieldClass ="loginAndRegisterField smaller" label="City*" type="text" id="city" onKeyUp={e => setCity(e.target.value)}/>
                <Field placeHolder="Enter your zip code"  fieldClass ="loginAndRegisterField smaller" label="Zip Code*" type="text" id="zipCode" onKeyUp={e => setZipCode(e.target.value)}/>
                </div>
                <label>Country*</label>
                <select className="countrySelector" onChange={(e) => {console.log(e.target.value);setCountry(e.target.value)}}>
                    <option disabled selected >Select your country</option>
                    {countries && countries.map(country =>{
                        return <option value={country.id}>{country.name}</option>
                    })}
                </select>
            </form>
            <p>Mandatory fields are marked with *</p>
            <div className='menuButtons'>
                <Button lable="CANCEL" buttonClass="cancel" onClick={() => navigate(-1)}></Button>
                <div className="nextButton" >
                    <Button className="nextButton" lable ="NEXT" buttonClass="purpleButton" onClick={() => props.nextStep()}></Button>
                </div>
                
            </div>
        </div>
    );
}

export default ShippingAddress;