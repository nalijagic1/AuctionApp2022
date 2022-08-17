import React from 'react';
import "./succesfulPayment.css"
import { useNavigate, useLocation } from 'react-router-dom';
import AuctionItem from '../../components/auctionItem/auctionItem';
import PathBar from '../../components/pathBar/pathBar';
import Button from '../../components/button/button';

function SuccesfulPayment() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {product,amount} = state;
    return (
        <div>
            <PathBar prop={{name: "Pay for Item", startPoint: "Shop",endPoint: "Pay for Item", path:"Single product"}}></PathBar>
            <div className='succesMessage'>
                <h5>PAYMENT COMPLETE</h5>
                <p>Thank you for completing your order! You have successfully purchased the following item:</p>
                <AuctionItem productId={product} amount={amount}/>
                <div class="buttonsMenu">
                    <Button lable="BROWSE ITEMS" buttonClass="purpleBorder" onClick={() => navigate("/shop/all")}/>
                    <Button lable="VIEW ITEMS" buttonClass="purpleButton" onClick={() => navigate("/product/" + product)}/>
                </div>
            </div>
        </div>
    );
}

export default SuccesfulPayment;