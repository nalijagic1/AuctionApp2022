import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PurpleStepper from "../../components/purpleStepper/purpleStepper";
import PathBar from "../../components/pathBar/pathBar";
import StepWizard from "react-step-wizard";
import ShippingAddress from "../../components/shippingAddress/shippingAddress";
import PaymentInfo from "../../components/paymentInfo/paymentInfo";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../services/payment.service";
import { STRIPE_PUBLIC } from "../../utils/constants";
import personService from "../../services/person.service";

function Payment() {
  const { state } = useLocation();
  const { price, product } = state;
  const [currentStep, setCurrentStep] = useState(0);
  const [enteredAddress, setEnteredAddress] = useState();
  const stripePromise = loadStripe(STRIPE_PUBLIC);
  const [clientSecret, setClientSecret] = useState();
  const options = {
    clientSecret,
    theme: "stripe",
  };
  const buyer = personService.getCurrentUser();
  useEffect(() => {
    paymentService.createIntent(price, product, buyer.id).then((response) => {
      setClientSecret(response.data.clientSecret);
    });
  }, [price, product, buyer]);
  function rememberLocation(location) {
    setEnteredAddress(location);
  }
  return (
    <div className="payment">
      <PathBar
        prop={{
          name: "Pay for Item",
          startPoint: "Shop",
          endPoint: "Pay for Item",
          paths: ["Single product"],
        }}
      ></PathBar>
      <PurpleStepper
        stepperClass="stepperTwoSteps"
        current={currentStep}
        numberOfSteps={2}
      />
      <StepWizard onStepChange={(e) => setCurrentStep(e.activeStep - 1)}>
        <ShippingAddress
          buyer={buyer.id}
          rememberLocation={(location) => rememberLocation(location)}
        />
        {clientSecret && (
          <PaymentInfo
            options={options}
            stripe={stripePromise}
            product={product}
            amount={price}
            location={enteredAddress}
          />
        )}
      </StepWizard>
    </div>
  );
}

export default Payment;
