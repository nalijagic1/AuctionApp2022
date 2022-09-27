import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import Button from "../button/button";
import "./popUpDialog.css";
import { DIALOG_TYPE } from "../../utils/dialog";
function PopUpDialog(props) {
  const { type, onClose, open, message, onApproved } = props;
  return (
    <StyledEngineProvider injectFirst>
      <Dialog onClose={onClose} open={open} className="dialog">
        <DialogTitle>{type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <div
          className={`answerButtons ${
            type === DIALOG_TYPE.INFO ? "okButton" : ""
          }`}
        >
          <Button
            label={type === DIALOG_TYPE.INFO ? "OK" : "No"}
            onClick={onClose}
            buttonClass="cancel"
          ></Button>
          {type === DIALOG_TYPE.CONFIRM && (
            <Button
              label="Yes"
              onClick={onApproved}
              buttonClass="purpleButton"
            ></Button>
          )}
        </div>
      </Dialog>
    </StyledEngineProvider>
  );
}

export default PopUpDialog;
