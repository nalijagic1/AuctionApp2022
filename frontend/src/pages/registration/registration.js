import Button from '../../components/button/button';
import {React,useState} from 'react';
import Field from '../../components/field/field';
import './registration.css'
import personService from '../../services/person.service';
import {useNavigate} from "react-router-dom";

function Registration() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const navigate = useNavigate();
    const [error,setError] = useState({firstName:"",lastName:"",email:"",password:""});
    function createAccount(){
        personService.createAccount(firstName,lastName,email,password).then((response)=>{
            if(localStorage.getItem('user')){
                navigate("/");
                window.location.reload();
            }
        }).catch(error =>{
            console.log(error.response);
        }) 
    }

    function validateData(){
        let errorMessages = {firstName:"",lastName:"",email:"",password:""};
        var valid = true;
        if(!firstName){
            valid = false;
            errorMessages.firstName = "First name is requered!"
        }else if( !/^[a-zA-Z]+$/.test(firstName)){
            valid = false;
            errorMessages.firstName = "First name must contain only letters!"
        }
        if(!lastName){
            valid = false;
            errorMessages.lastName = "Last name is requered!"
        }else if( !/^[a-zA-Z]+$/.test(lastName)){
            valid = false;
            errorMessages.firstName = "Last name must contain only letters!"
        }
        if(!email){
            errorMessages.email = "Email is requered!";
            valid = false;
        }else{
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            valid = expression.test(String(email).toLowerCase());
            if(valid === false){
              errorMessages.email = "Email format is not valid, please try again!"; 
            }
        }
        if(!password){
            errorMessages.password = "Password is requered!";
            valid = false;
        }else if(!/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(password)){
            errorMessages.password ="Your password is week!";
            valid = false;
        }
        setError(errorMessages);
        return valid;
    }
    return (
        <div className='userRegistration'>
        <hr/>
        <div className="registration">
           <h5>REGISTER</h5> 
                <form>
                <Field placeHolder="Enter your first name" label="First name"  fieldClass ="loginAndRegisterField"  id="firstName" type="text" onKeyUp ={e => setFirstName(e.target.value)} error={error.firstName}></Field>
                <Field placeHolder="Enter your last name" label="Last name" fieldClass ="loginAndRegisterField"  id="lastName" type="text"  onKeyUp ={e => setLastName(e.target.value)} error={error.lastName}></Field>
                <Field placeHolder="Enter your email" label="Email"  fieldClass ="loginAndRegisterField"  id="email" type="email" onKeyUp ={e => setEmail(e.target.value)} error={error.email}></Field>
                <Field placeHolder="Enter your password" label="Password" fieldClass ="loginAndRegisterField"  id="password" type="password"  onKeyUp ={e => setPassword(e.target.value)} error={error.password}></Field>
                <Button lable="Register" onClick={() => {if(validateData())createAccount();}}/> 
            </form>
            <div className='accountLogIn'>
                Already have and account? <a href='/login'>Login</a>
            </div>

        </div>
        </div>
    );
}

export default Registration;
