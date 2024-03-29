import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const TooltipMessage = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "#8367D8",
    color: "#FFFFFF",
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&::before": {
      backgroundColor: "#8367D8",
    },
  },
}));

export default TooltipMessage;
