import React from "react";
import Button from "../../components/button/button";
import "./resetEmailSent.css";
import {useNavigate } from "react-router-dom";

function ResetEmailSent() {
const navigator = useNavigate();
  return (
    <div className="sentEmail">
      <hr />
      <div className="sentEmailWindow ">
        <h5>CHECK YOUR EMAIL</h5>
        <p>
        We have sent password recover instructions to your email.<br></br> Please check your email.
        </p>
        <Button
          label="GO TO HOMEPAGE"
          buttonClass="purpleButton userManagment"
          onClick={() => {
            navigator("/")
          }}
        />
      </div>
    </div>
  );
}

export default ResetEmailSent;