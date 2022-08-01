import Button from '../../components/button/button';
import {React,useState} from 'react';
import Field from '../../components/field/field';
import './logIn.css'
import personService from '../../services/person.service';
import {useNavigate} from "react-router-dom";

function LogIn() {
    let navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState({email:"",password:""})
    function logIntoAccount(){
        personService.logIn(email,password).then((response)=>{
            if(localStorage.getItem('user')){
                navigate("/");
                window.location.reload();
            }
        }).catch(error =>{
            console.log(error.response.data.message);
        }) 
       
    }
    function formValidation(){
        let valid = true;
        let errorMessages = {email:"",password:""}
        if(!email){
            errorMessages.email = "Email is requered!"
            valid = false;
        }else{
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            valid = expression.test(String(email).toLowerCase())
            if(valid === false){
              errorMessages.email = "Email format is not valid, please try again!"  
            }
        }
        if(!password){
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
                <Field placeHolder="Enter your email" label="Email"  fieldClass ="loginAndRegisterField"  id="email" type="email" onKeyUp ={e => setEmail(e.target.value)} error={error.email}></Field>
                <Field placeHolder="Enter your password" label="Password" fieldClass ="loginAndRegisterField"  id="password" type="password"  onKeyUp ={e => setPassword(e.target.value)}  error={error.password}></Field>
                <Button lable="Login" onClick={() => {if(formValidation())logIntoAccount();}}/> 
            </form>
           <a>Forgot password?</a>
        </div>
        </div>
    );
}

export default LogIn;
