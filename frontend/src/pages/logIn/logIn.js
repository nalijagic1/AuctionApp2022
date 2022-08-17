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
      .then(() => {
        if (localStorage.getItem("user")) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.data === "Bad credentials") {
          setError({ email: "", password: "Incorrect password." });
        } else {
            console.log(error)
            setError((data) => {
            if (error.response.data.errorCode) {
              return validation.determanError(error.response.data.errorCode);
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
            onKeyUp={(e) => setEmail(e.target.value)}
            error={error.email}
          ></Field>
          <Field
            placeHolder="Enter your password"
            label="Password"
            fieldClass="loginAndRegisterField"
            id="password"
            type={showPassword ? "text" : "password"}
            onKeyUp={(e) => setPassword(e.target.value)}
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
            lable="Login"
            buttonClass="purpleButton userManagment"
            onClick={() => {
              if (formValidation()) logIntoAccount();
            }}
          />
        </form>
        <a>Forgot password?</a>
      </div>
    </div>
  );
}

export default LogIn;
