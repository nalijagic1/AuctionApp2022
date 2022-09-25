import React, { useState } from "react";
import Button from "../../components/button/button";
import { updateErrorMessage } from "../../utils/handleEvent";
import Field from "../../components/field/field";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineConsoleSql,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import validation from "../../utils/validation";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const navigator = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState();
  const [passwordStrength, setPasswordStrength] = useState();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const tokentInfo = JSON.parse(atob(token.split(".")[1]));
  function validateData() {
    let validationResult = validation.formValidation(
      { password, confirmPassword },
      2
    );
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }
  const [error, setError] = useState({ password: "", confirmPassword: "" });
  return (
    <div className="resetPassword">
      <hr />
      <div className="resetPasswordForm">
        <h5>RESET PASSWORD</h5>
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
        <Field
          placeHolder="Confirm password"
          label="Confirm password"
          fieldClass="loginAndRegisterField"
          id="confirmPassword"
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          onChange={(e) => {
            setError(updateErrorMessage(error, "confirmPassword"));
            setConfirmPassword(e.target.value);
          }}
          error={error.confirmPassword}
          iconShow={
            showConfirmPassword ? (
              <AiOutlineEyeInvisible
                className="passwordIcon"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className="passwordIcon"
                onClick={() => setShowConfirmPassword(true)}
              />
            )
          }
        ></Field>
        <Button
          label="RESET PASSWORD"
          buttonClass="purpleButton userManagment"
          onClick={() => {
            if (validateData()) console.log("We did it");
          }}
        />
      </div>
    </div>
  );
}

export default ResetPassword;
