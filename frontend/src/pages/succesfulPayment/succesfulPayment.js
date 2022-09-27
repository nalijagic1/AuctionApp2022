import React, { useEffect, useState } from "react";
import "./succesfulPayment.css";
import { useNavigate, useLocation } from "react-router-dom";
import AuctionItem from "../../components/auctionItem/auctionItem";
import PathBar from "../../components/pathBar/pathBar";
import Button from "../../components/button/button";
import productService from "../../services/product.service";
import Loader from "../../components/loader/loader";

function SuccesfulPayment() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const amount = query.get("amount");
  const product = query.get("product");
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    productService.updatePayedStatus(true, product);
  }, [product]);
  return (
    <div>
      <PathBar
        prop={{
          name: "Pay for Item",
          startPoint: "Shop",
          endPoint: "Pay for Item",
          path: "Single product",
        }}
      ></PathBar>
      {loading ?<Loader></Loader>:<div className="succesMessage">
        <h5>PAYMENT COMPLETE</h5>
        <p>
          Thank you for completing your order! You have successfully purchased
          the following item:
        </p>
        <AuctionItem  loadingState={(state)=>setLoading(state)}productId={product} amount={amount} />
        <div className="buttonsMenu">
          <Button
            label="BROWSE ITEMS"
            buttonClass="purpleBorder"
            onClick={() => navigate("/shop/all")}
          />
          <Button
            label="VIEW ITEM"
            buttonClass="purpleButton"
            onClick={() => navigate("/product/" + product)}
          />
        </div>
      </div>}
    </div>
  );
}

export default SuccesfulPayment;
