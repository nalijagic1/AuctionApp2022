import React from "react";

import { Dialog, DialogTitle,DialogContent,DialogContentText } from "@mui/material";
import Button from "../button/button";
import "./confirmDialog.css";
function ConfirmDialog(props) {
  const { onClose, open,message,onApproved} = props;
  function handleClose() {
    onClose();
  }
  return (
    <Dialog onClose={handleClose} open={open} className="dialog">
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {message}
          </DialogContentText>
        </DialogContent>
        <div className="answerButtons">
            <Button label = "No" onClick={onClose} buttonClass="cancel"></Button>
            <Button label="Yes" onClick={onApproved} buttonClass="purpleButton"></Button>
        </div>
    </Dialog>
  );
}

export default ConfirmDialog;
