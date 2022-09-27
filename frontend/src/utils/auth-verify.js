import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PopUpDialog from "../components/popUpDialog/popUpDialog";
import personService from "../services/person.service";
import { DIALOG_CONTENT, DIALOG_TYPE } from "./dialog";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
function AuthVerify() {
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        personService.logout();
        setOpenDialog(true);
      }
    }
  }, [navigator, location]);
  return (
    <div>
      <PopUpDialog
        type={DIALOG_TYPE.INFO}
        open={openDialog}
        message={DIALOG_CONTENT.TOKEN_EXPIRED}
        onClose={() => {
          setOpenDialog(false);
          navigate("/");
          window.location.reload();
        }}
      ></PopUpDialog>
    </div>
  );
}
export default AuthVerify;
