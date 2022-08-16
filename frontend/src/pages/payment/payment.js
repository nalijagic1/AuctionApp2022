import {React,useState,useEffect} from 'react';
import { useParams,useLocation } from 'react-router-dom';
import './payment.css';
import PurpleStepper from '../../components/stepper/purpleStepper';
import PathBar from '../../components/pathBar/pathBar';
import StepWizard from "react-step-wizard";
import ShippingAddress from '../../components/shippingAddress/shippingAddress';
import PaymentInfo from '../../components/paymentInfo/paymentInfo';

function Payment() {
    const {state} = useLocation();
    const {price,seller,product} = state;
    const [currentStep,setCurrentStep] = useState(0)
    return (
        <div className='payment'>
            <PathBar prop={{name: "Pay for Item", startPoint: "Shop",endPoint: "Pay for Item", path:"Single product"}}></PathBar>
            <PurpleStepper   className ="stepperPayment" current={currentStep} numberOfSteps={3}/>
            <StepWizard onStepChange={(e)=> setCurrentStep(e.activeStep-1)}>
                <ShippingAddress/>
                <PaymentInfo/>
            </StepWizard>

        </div>
    );
}

export default Payment;