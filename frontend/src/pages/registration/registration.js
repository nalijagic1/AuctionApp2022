import Button from '../../components/button/button';
import {React,useState} from 'react';
import Field from '../../components/field/field';
import './registration.css'

function Registration() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    return (
        <div className='userRegistration'>
        <hr/>
        <div className="registration">
           <h5>REGISTER</h5> 
                <form>
                <Field placeHolder="Enter your first name" label="First name"  fieldClass ="loginAndRegisterField"  id="firstName" type="text" onKeyUp ={e => setFirstName(e.target.value)}></Field>
                <Field placeHolder="Enter your last name" label="Last name" fieldClass ="loginAndRegisterField"  id="lastName" type="text"  onKeyUp ={e => setLastName(e.target.value)}></Field>
                <Field placeHolder="Enter your email" label="Email"  fieldClass ="loginAndRegisterField"  id="email" type="email" onKeyUp ={e => setEmail(e.target.value)}></Field>
                <Field placeHolder="Enter your password" label="Password" fieldClass ="loginAndRegisterField"  id="password" type="password"  onKeyUp ={e => setPassword(e.target.value)}></Field>
                <Button lable="Register"/> 
            </form>

        </div>
        </div>
    );
}

export default Registration;
