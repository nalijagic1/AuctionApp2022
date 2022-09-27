import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import "./loader.css";

function Loader() {
  return (
    <div className="loader">
      <div>
        <StyledEngineProvider injectFirst>
          <CircularProgress
            className="loading"
            style={{ width: "60px", height: "60px" }}
          />
        </StyledEngineProvider>
      </div>
    </div>
  );
}

export default Loader;
