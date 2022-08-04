import Button from '../../components/button/button';
import {React, useState} from 'react';
import Field from '../../components/field/field';
import './logIn.css'
import personService from '../../services/person.service';
import {useNavigate} from "react-router-dom";
import validation from '../../validation';

function LogIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({email: "", password: ""})

    function logIntoAccount() {
        personService.logIn(email, password).then((response) => {
            if (localStorage.getItem('user')) {
                navigate("/");
                window.location.reload();
            }
        }).catch(error => {

            if (error.response.data === "Bad credentials") {
                setError({email: "", password: "Incorrect password"});
            } else if (error.response.data.toLowerCase().includes("email")) {
                setError({email: error.response.data, password: ""});
            } else {
                setError({email: "", password: error.response.data});
            }
        })

    }

    function formValidation() {
        var valid = true;
        var errorMessages = {email: "", password: ""}
        errorMessages.email = validation.validateEmail(email)
        if (errorMessages.email !== "") valid = false;
        if (!password) {
            errorMessages.password = "Password is requered!"
            valid = false;
        }
        setError(errorMessages)
        return valid;
    }

    return (
        <div className='userLogIn'>
            <hr/>
            <div className="logIn">
                <h5>LOGIN</h5>
                <form>
                    <Field placeHolder="Enter your email" label="Email" fieldClass="loginAndRegisterField" id="email"
                           type="email" onKeyUp={e => setEmail(e.target.value)} error={error.email}></Field>
                    <Field placeHolder="Enter your password" label="Password" fieldClass="loginAndRegisterField"
                           id="password" type="password" onKeyUp={e => setPassword(e.target.value)}
                           error={error.password}></Field>
                    <Button lable="Login"  buttonClass ="purpleButton userManagment" onClick={() => {
                        if (formValidation()) logIntoAccount();
                    }}/>
                </form>
                <a>Forgot password?</a>
            </div>
        </div>
    );
}

export default LogIn;
