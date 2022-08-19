import {React,useState} from 'react';
import "./paymentInfo.css"
import { Elements} from "@stripe/react-stripe-js";
import Button from '../button/button';
import { useNavigate } from 'react-router';
import CardInfo from '../cardInfo/cardInfo';

function PaymentInfo(props) {
    const navigate = useNavigate();
    const [cardInformation,setCardInformation] = useState()
    const [validCard,setValidCard] = useState()
    const [stripe,setStripe] = useState();


    function payBid(){
        
        if (!stripe || !cardInformation) {
            return;
          }
      console.log("here")
    stripe.confirmPayment({
            cardInformation,
            confirmParams: {
              return_url: "/paymentComplete",
            },
          }).then((result) =>{
            if(result.error) console.log(result.error)
          });
          
    }
    return (
        <div className="paymentInformation">
            <h5>Credit Card</h5>
            <Elements options={props.options} stripe={props.stripe}>
                <CardInfo getStripe= {(stripeInstance)=> setStripe(stripeInstance)}changeCardData={(cardData,validData) => {setCardInformation(cardData); setValidCard(validData)}} />
            </Elements>
            <div className='navigationButtons'>
                <Button lable="CANCEL" buttonClass="cancel" onClick={() => navigate(-1)}></Button>
                <div className="optionButtons" >
                    <Button lable ="BACK" buttonClass="purpleBorder" onClick = {() => props.previousStep()}/>
                    <Button lable ={`PAY ${props.amount}$`} buttonClass="purpleButton" onClick={() => {if(validCard)payBid();}}></Button>
                </div>
                
            </div>
        </div>
    );
}

export default PaymentInfo;