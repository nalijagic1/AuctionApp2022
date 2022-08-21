import React, { useState } from "react";
import PathBar from "../../components/pathBar/pathBar";
import PurpleStepper from "../../components/purpleStepper/purpleStepper";
import StepWizard from "react-step-wizard";
import "./addNewItem.css";
import NewProductDetails from "../../components/newProductDetails/newProductDetails";
import NewProductPrice from "../../components/newProductPrice/newProductPrice";

function AddNewItem() {
    const[activeStep,setActiveStep] = useState(0);
  return (
    <div className="addItem">
      <PathBar
        prop={{
          name: "Seller",
          startPoint: "My account",
          endPoint: "Add item",
        }}
      ></PathBar>
      <PurpleStepper current={activeStep} numberOfSteps={3} stepperClass="stepperThreeSteps"/>
      <StepWizard onStepChange={(e) => setActiveStep(e.activeStep - 1)} className="newProductWizard">
        <NewProductDetails/>
        <NewProductPrice/>
      </StepWizard>
    </div>
  );
}

export default AddNewItem;
