import Button from "../../components/button/button";
import { React, useState } from "react";
import Field from "../../components/field/field";
import "./registration.css";
import personService from "../../services/person.service";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Registration() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState();
  const [passwordStrength, setPasswordStrength] = useState();

  function createAccount() {
    personService
      .createAccount(firstName, lastName, email, password)
      .then((response) => {
        if (localStorage.getItem("user")) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setError((data) => {
          if (error.response.data.field) {
            const errorData = { ...data };
            var type = validation.getFieldType(error.response.data.field)
            errorData[type] = error.response.data.message;
            return errorData;
          }
          return error.response.data;
        });
      });
  }

  function validateData() {
    setPasswordStrengthMessage("");
    let validationResult = validation.formValidation(
      { firstName, lastName, email, password },
      2
    );
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }

  return (
    <div className="userRegistration">
      <hr />
      <div className="registration">
        <h5>REGISTER</h5>
        <form>
          <Field
            placeHolder="Enter your first name"
            label="First name"
            fieldClass="loginAndRegisterField"
            id="firstName"
            type="text"
            onKeyUp={(e) => {
              setError({
                firstName: "",
                lastName: error.lastName,
                email: error.email,
                password: error.password,
              });
              setFirstName(e.target.value);
            }}
            error={error.firstName}
          ></Field>
          <Field
            placeHolder="Enter your last name"
            label="Last name"
            fieldClass="loginAndRegisterField"
            id="lastName"
            type="text"
            onKeyUp={(e) => {
              setError({
                firstName: error.firstName,
                lastName: "",
                email: error.email,
                password: error.password,
              });
              setLastName(e.target.value);
            }}
            error={error.lastName}
          ></Field>
          <Field
            placeHolder="Enter your email"
            label="Email"
            fieldClass="loginAndRegisterField"
            id="email"
            type="email"
            onKeyUp={(e) => {
              setError({
                firstName: error.firstName,
                lastName: error.lastName,
                email: "",
                password: error.password,
              });
              setEmail(e.target.value);
            }}
            error={error.email}
          ></Field>
          <Field
            placeHolder="Enter your password"
            label="Password"
            fieldClass="loginAndRegisterField"
            id="password"
            type={showPassword ? "text" : "password"}
            onKeyUp={(e) => {
              setError({
                firstName: error.firstName,
                lastName: error.lastName,
                email: error.email,
                password: "",
              });
              setPassword(e.target.value);
              setPasswordStrengthMessage(
                validation.validatePassword(e.target.value)
              );
              setPasswordStrength(
                validation.determainPasswordStrength(e.target.value)
              );
            }}
            error={error.password}
            info={passwordStrengthMessage}
            infoType={passwordStrength}
            iconShow={
              showPassword ? (
                <AiOutlineEyeInvisible
                  className="passwordIcon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiOutlineEye
                  className="passwordIcon"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          ></Field>
          <Button
            lable="Register"
            buttonClass="purpleButton userManagment"
            onClick={() => {
              if (validateData()) createAccount();
            }}
          />
        </form>
        <div className="accountLogIn">
          Already have and account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Registration;
