import React from "react";
import Button from "../../components/button/button";
import "./succesfulResetPassword.css";
import {useNavigate } from "react-router-dom";

function SuccesfulPasswordChange() {
const navigator = useNavigate();
  return (
    <div className="changedPassword">
      <hr />
      <div className="passwordChanged">
        <h5>PASSWORD CHANGED</h5>
        <p>
        Congratulations! You have succesfully changed your password. Try logging in with your new password!
        </p>
        <Button
          label="GO TO LOGIN"
          buttonClass="purpleButton userManagment"
          onClick={() => {
            navigator("/login")
          }}
        />
      </div>
    </div>
  );
}

export default SuccesfulPasswordChange;