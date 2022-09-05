import React, { useState, useEffect } from "react";
import PathBar from "../../components/pathBar/pathBar";
import PurpleStepper from "../../components/purpleStepper/purpleStepper";
import StepWizard from "react-step-wizard";
import "./addNewItem.css";
import NewProductDetails from "../../components/newProductDetails/newProductDetails";
import NewProductPrice from "../../components/newProductPrice/newProductPrice";
import ProductLocation from "../../components/productLocation/productLocation";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../services/payment.service";
import personService from "../../services/person.service";
import { STRIPE_PUBLIC } from "../../utils/constants";

function AddNewItem() {
  const [activeStep, setActiveStep] = useState(0);
  const [basicDetails, setBasicDetails] = useState();
  const [priceDetails, setPriceDetails] = useState();
  const stripePromise = loadStripe(STRIPE_PUBLIC);
  const buyer = personService.getCurrentUser();
  const [clientSecret, setClientSecret] = useState();

  const options = {
    clientSecret,
    theme: "stripe",
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
        <NewProductPrice
          setPriceInfo={(priceInfo) => setPriceDetails(priceInfo)}
        />
        {clientSecret && (
          <ProductLocation
            options={options}
            stripe={stripePromise}
            priceDetails={priceDetails}
            productInfo={basicDetails}
          />
        )}
      </StepWizard>
    </div>
  );
}

export default AddNewItem;
