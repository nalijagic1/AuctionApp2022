import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import "./loader.css";

function Loader() {
 
  return (
    <div className="loader">
        <div>
            <h1>Loading ...</h1>
            <StyledEngineProvider injectFirst>
                <CircularProgress className="loading"/>
            </StyledEngineProvider>
            
        </div>
    
    </div>
  );
}

export default Loader;
