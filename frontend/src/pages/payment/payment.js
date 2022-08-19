import {React,useState,useEffect} from 'react';
import {useLocation } from 'react-router-dom';

import PurpleStepper from '../../components/purpleStepper/purpleStepper';
import PathBar from '../../components/pathBar/pathBar';
import StepWizard from "react-step-wizard";
import ShippingAddress from '../../components/shippingAddress/shippingAddress';
import PaymentInfo from '../../components/paymentInfo/paymentInfo';
import { loadStripe } from "@stripe/stripe-js";
import paymentService from '../../services/payment.service';
import './payment.css';

function Payment() {
    const {state} = useLocation();
    const {price,seller,product} = state;
    const [currentStep,setCurrentStep] = useState(0);
    const [enteredAddress,setEnteredAddress] = useState();
    const stripePromise = loadStripe("pk_test_51LVB8xBj1vinbdx6NyD5IYpzSgWonLR41HNAETguKGEXelw3DcPqP0l3JQ69NAsJOjrfPue0tK2rjJ423fr5PgJS00fSun4phx");
    const [clientSecret,setClientSecret] = useState();
    const appearance = {
        theme: 'stripe',    
  };
      const options = {
        clientSecret,
        appearance,
      };
    useEffect(()=>{
        paymentService.createIntent(price,product,seller).then((response)=>{
            setClientSecret(response.data.clientSecret);
        })
    },[])
    function rememberLocation(location){
        setEnteredAddress(location);
    }
    return (
        <div className='payment'>
            <PathBar prop={{name: "Pay for Item", startPoint: "Shop",endPoint: "Pay for Item", path:"Single product"}}></PathBar>
            <PurpleStepper   stepperClass="stepperTwoSteps" current={currentStep} numberOfSteps={2}/>
            <StepWizard onStepChange={(e)=> setCurrentStep(e.activeStep-1)}>
                <ShippingAddress rememberLocation ={(location) => rememberLocation(location)}/>
                {clientSecret &&
                    <PaymentInfo options={options} stripe={stripePromise} product={product} amount={price} location = {enteredAddress}/>
                }
            </StepWizard>

        </div>
    );
}

export default Payment;