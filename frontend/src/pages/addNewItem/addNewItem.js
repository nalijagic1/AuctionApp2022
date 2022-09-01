import React, { useState, useEffect } from "react";
import PathBar from "../../components/pathBar/pathBar";
import PurpleStepper from "../../components/purpleStepper/purpleStepper";
import StepWizard from "react-step-wizard";
import "./addNewItem.css";
import NewProductDetails from "../../components/newProductDetails/newProductDetails";
import NewProductPrice from "../../components/newProductPrice/newProductPrice";
import NewProductLocation from "../../components/newProductLocation/newProductLocation";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../services/payment.service";
import personService from "../../services/person.service";

function AddNewItem() {
  const [activeStep, setActiveStep] = useState(0);
  const [basicDetails, setBasicDetails] = useState();
  const [priceDetails, setPriceDetails] = useState();
  const stripePromise = loadStripe(
    "pk_test_51LVB8xBj1vinbdx6NyD5IYpzSgWonLR41HNAETguKGEXelw3DcPqP0l3JQ69NAsJOjrfPue0tK2rjJ423fr5PgJS00fSun4phx"
  );
  const buyer = personService.getCurrentUser();
  const [clientSecret, setClientSecret] = useState();
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    paymentService.createSetUpIntent(buyer.id).then((response) => {
      setClientSecret(response.data.clientSecret);
    });
  }, [buyer]);
  return (
    <div className="addItem">
      <PathBar
        prop={{
          name: "Seller",
          startPoint: "My account",
          endPoint: "Add item",
        }}
      ></PathBar>
      <PurpleStepper
        current={activeStep}
        numberOfSteps={3}
        stepperClass="stepperThreeSteps"
      />
      <StepWizard
        onStepChange={(e) => setActiveStep(e.activeStep - 1)}
        className="newProductWizard"
      >
        <NewProductDetails
          setProductInfo={(productInfo) => setBasicDetails(productInfo)}
        />
        <NewProductPrice setPriceInfo={(priceInfo) => setPriceDetails(priceInfo)}/>
        {clientSecret && (
          <NewProductLocation options={options} stripe={stripePromise} price={priceDetails} productInfo={basicDetails}/>
        )}
      </StepWizard>
    </div>
  );
}

export default AddNewItem;
