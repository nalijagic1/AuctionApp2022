import Button from "../../components/button/button";
import { React, useState } from "react";
import Field from "../../components/field/field";
import "./logIn.css";
import personService from "../../services/person.service";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updateErrorMessage } from "../../utils/handleEvent";
import { ROLES } from "../../utils/roles";
import Loader from "../../components/loader/loader";

function LogIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  function logIntoAccount() {
    setLoader(true);
    personService
      .logIn(email, password)
      .then((response) => {
        if (localStorage.getItem("user")) {
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
        if (error.response.data === "Bad credentials") {
          setError({ email: "", password: "Incorrect password." });
        } else {
          setError(() => {
            if (error.response.data.errorCode) {
              return validation.determineError(error.response.data.errorCode);
            }
            return error.response.data;
          });
        }
      });
  }

  function formValidation() {
    let validationResult = validation.formValidation({ email, password }, 1);
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }

  return (
    <div className="userLogIn">
      <hr />
      {loader ? (
        <Loader></Loader>
      ) : (
        <div className="logIn">
          <h5>LOGIN</h5>
          <form>
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setError(updateErrorMessage(error, "password"));
                setPassword(e.target.value);
              }}
              error={error.password}
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
              label="Login"
              buttonClass="purpleButton userManagment"
              onClick={() => {
                if (formValidation()) logIntoAccount();
              }}
            />
          </form>
          <a  href="/forgotPassword">Forgot password?</a>
        </div>
      )}
    </div>
  );
}

export default LogIn;
