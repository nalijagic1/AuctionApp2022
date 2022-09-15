import React, { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import personService from "../services/person.service";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
function AuthVerify() {
  const { navigator } = useContext(UNSAFE_NavigationContext);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        personService.logout();
        navigate("/");
        window.location.reload();
      }
    }
  }, [navigator,navigate]);
  return <div></div>;
}

export default AuthVerify;
