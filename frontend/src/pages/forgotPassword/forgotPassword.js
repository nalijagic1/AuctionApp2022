import React, { useState } from "react";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import validation from "../../utils/validation";
import "./forgotPassword.css";
import personService from "../../services/person.service";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function sendResetEmail() {
    personService
      .sendResetEmail(email)
      .then(() => {
        navigate("/emailSent")
      })
      .catch((error) => {
        setError(
          validation.determineError(error.response.data.errorCode).email
        );
      });
  }

  return (
    <div className="forgotPassword">
      <hr />
      <div className="forgotPasswordForm">
        <h5>FORGOT PASSWORD</h5>
        <p className="resetInstructions">
          Lost your password? Please enter your username or email address. You
          will receive a link to create a new password via email.
        </p>
        <Field
          placeHolder="Enter your email"
          label="Enter email"
          fieldClass="loginAndRegisterField"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
          error={error}
        ></Field>
        <Button
          label="RESET PASSWORD"
          buttonClass="purpleButton userManagment"
          onClick={() => {
            var validateEmail = validation.validateEmail(email);
            setError(validateEmail);
            if (validateEmail === "") sendResetEmail();
          }}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
