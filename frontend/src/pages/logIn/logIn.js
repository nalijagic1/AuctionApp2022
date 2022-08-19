import Button from "../../components/button/button";
import { React, useState } from "react";
import Field from "../../components/field/field";
import "./logIn.css";
import personService from "../../services/person.service";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/validation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function LogIn() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function logIntoAccount() {
    personService
      .logIn(email, password)
      .then((response) => {
        if (response.status === 200) {
          if (localStorage.getItem("user")) {
            navigate("/");
            window.location.reload();
          }
        }
      })
      .catch((error) => {
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
      <div className="logIn">
        <h5>LOGIN</h5>
        <form>
          <Field
            placeHolder="Enter your email"
            label="Email"
            fieldClass="loginAndRegisterField"
            id="email"
            type="email"
            onKeyUp={(e) => {
              setError({ email: "", password: error.password });
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
              setError({ email: error.email, password: "" });
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
        <a href="/">Forgot password?</a>
      </div>
    </div>
  );
}

export default LogIn;
