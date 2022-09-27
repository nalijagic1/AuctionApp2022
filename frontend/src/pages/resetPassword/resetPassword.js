import React, { useState } from "react";
import Button from "../../components/button/button";
import { updateErrorMessage } from "../../utils/handleEvent";
import Field from "../../components/field/field";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import validation from "../../utils/validation";
import { useLocation } from "react-router-dom";
import personService from "../../services/person.service";
import Loader from "../../components/loader/loader";

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
  const tokenInfo = JSON.parse(atob(token.split(".")[1]));
  const [loader, setLoader] = useState(false);
  const linkExpired = tokenInfo.exp * 1000 < Date.now();
  function validateData() {
    let validationResult = validation.formValidation(
      { password, confirmPassword },
      2
    );
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }

  function changePassword() {
    setLoader(true);
    personService.changePassword(tokenInfo.sub, password).then(() => {
      setLoader(false);
      navigator("/succesfulChange");
    });
  }
  function sendResetEmail() {
    setLoader(true);
    personService.sendResetEmail(tokenInfo.sub).then(() => {
      setLoader(false);
      navigator("/emailSent");
    });
  }
  const [error, setError] = useState({ password: "", confirmPassword: "" });
  return (
    <div className="resetPassword">
      <hr />
      {loader ? (
        <Loader></Loader>
      ) : (
        <div className="resetPasswordForm">
          <h5>RESET PASSWORD</h5>
          {linkExpired ? (
            <div className="linkExpired">
              <p>
                We are really sorry, but your reset link has expired. Do you
                want us to resent you reset link?
              </p>
              <div className="resetButtons">
                <Button
                  label="GO TO HOMEPAGE"
                  buttonClass="purpleBorder"
                  onClick={() => {
                    navigator("/");
                  }}
                ></Button>
                <Button
                  label="RESEND LINK"
                  buttonClass="purpleButton"
                  onClick={() => {
                    sendResetEmail();
                  }}
                ></Button>
              </div>
            </div>
          ) : (
            <div>
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
                  if (validateData()) changePassword();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
