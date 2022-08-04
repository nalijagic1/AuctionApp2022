import Button from '../../components/button/button';
import {React, useState} from 'react';
import Field from '../../components/field/field';
import './registration.css'
import personService from '../../services/person.service';
import {useNavigate} from "react-router-dom";
import validation from '../../validation';

function Registration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const navigate = useNavigate();
    const [error, setError] = useState({firstName: "", lastName: "", email: "", password: ""});

    function createAccount() {
        personService.createAccount(firstName, lastName, email, password).then((response) => {
            if (localStorage.getItem('user')) {
                navigate("/");
                window.location.reload();
            }
        }).catch(error => {
            if (error.response.data.toLowerCase().includes("email")) {
                setError({firstName: "", lastName: "", email: error.response.data, password: ""});
            } else if (error.response.data.toLowerCase().includes("first")) {
                setError({firstName: error.response.data, lastName: "", email: "", password: ""});
            } else if (error.response.data.toLowerCase().includes("last")) {
                setError({firstName: "", lastName: error.response.data, email: "", password: ""});
            } else {
                setError({firstName: "", lastName: "", email: "", password: error.response.data});
            }
        })
    }

    function validateData() {
        let errorMessages = {firstName: "", lastName: "", email: "", password: ""};
        var valid = true;
        errorMessages.firstName = validation.validateNames(firstName, "First");
        errorMessages.lastName = validation.validateNames(lastName, "Last");
        errorMessages.email = validation.validateEmail(email);
        errorMessages.password = validation.validatePassword(password);
        if (Object.values(errorMessages).findIndex(object => {
            return object !== "";
        }) !== -1) valid = false;
        setError(errorMessages);
        return valid;
    }

    return (
        <div className='userRegistration'>
            <hr/>
            <div className="registration">
                <h5>REGISTER</h5>
                <form>
                    <Field placeHolder="Enter your first name" label="First name" fieldClass="loginAndRegisterField"
                           id="firstName" type="text" onKeyUp={e => setFirstName(e.target.value)}
                           error={error.firstName}></Field>
                    <Field placeHolder="Enter your last name" label="Last name" fieldClass="loginAndRegisterField"
                           id="lastName" type="text" onKeyUp={e => setLastName(e.target.value)}
                           error={error.lastName}></Field>
                    <Field placeHolder="Enter your email" label="Email" fieldClass="loginAndRegisterField" id="email"
                           type="email" onKeyUp={e => setEmail(e.target.value)} error={error.email}></Field>
                    <Field placeHolder="Enter your password" label="Password" fieldClass="loginAndRegisterField"
                           id="password" type="password" onKeyUp={e => setPassword(e.target.value)}
                           error={error.password}></Field>
                    <Button lable="Register"  buttonClass ="purpleButton userManagment" onClick={() => {
                        if (validateData()) createAccount();
                    }}/>
                </form>
                <div className='accountLogIn'>
                    Already have and account? <a href='/login'>Login</a>
                </div>

            </div>
        </div>
    );
}

export default Registration;
