import Button from "../../components/button/button";
import { React, useState } from "react";
import Field from "../../components/field/field";
import "./registration.css";
import personService from "../../services/person.service";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updateErrorMessage } from "../../utils/handleEvent";
import { ROLES } from "../../utils/roles";
import Loader from "../../components/loader/loader";

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
  const [loader, setLoader] = useState(false);

  function createAccount() {
    setLoader(true);
    personService
      .createAccount(firstName, lastName, email, password)
      .then((response) => {
        if (localStorage.getItem("user")) {
          setLoader(false);
          navigate(
            personService.getCurrentUser().role === ROLES.ADMIN
              ? "/userManagement"
              : "/"
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        setLoader(false);
        setError(() => {
          if (error.response.data.errorCode) {
            return validation.determineError(error.response.data.errorCode);
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
      {loader ? (
        <Loader />
      ) : (
        <div className="registration">
          <h5>REGISTER</h5>
          <form>
            <Field
              placeHolder="Enter your first name"
              label="First name"
              fieldClass="loginAndRegisterField"
              id="firstName"
              type="text"
              onChange={(e) => {
                setError(updateErrorMessage(error, "firstName"));
                setFirstName(e.target.value);
              }}
              error={error.firstName}
              value={firstName}
            ></Field>
            <Field
              placeHolder="Enter your last name"
              label="Last name"
              fieldClass="loginAndRegisterField"
              id="lastName"
              type="text"
              onChange={(e) => {
                setError(updateErrorMessage(error, "lastName"));
                setLastName(e.target.value);
              }}
              error={error.lastName}
              value={lastName}
            ></Field>
            <Field
              placeHolder="Enter your email"
              label="Email"
              fieldClass="loginAndRegisterField"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setError(updateErrorMessage(error, "email"));
                setEmail(e.target.value);
              }}
              error={error.email}
            ></Field>
            <Field
              placeHolder="Enter your password"
              label="Password"
              fieldClass="loginAndRegisterField"
              id="password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setError(updateErrorMessage(error, "password"));
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
              label="Register"
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
      )}
    </div>
  );
}

export default Registration;
