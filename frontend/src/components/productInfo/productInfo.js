import React, { useEffect, useState, useRef } from "react";
import Field from "../field/field";
import Button from "../button/button";
import "./productInfo.css";
import bidService from "../../services/bid.service";
import moment from "moment";
import personService from "../../services/person.service";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TooltipMessage from "../tooltipMessage/tooltipMessage";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

function ProductInfo({ product, showNotification }) {
  const navigate = useNavigate();
  const showOnce = useRef(1);
  const [highestBid, setHighestBid] = useState(0);
  const [count, setCount] = useState(0);
  const [biddingEnabled, setBiddingEnabled] = useState();
  const [warningText, setWarningText] = useState("");
  const [bid, setBid] = useState("");
  const [notSeller, setNotSeller] = useState(true);
  const [ended, setEnded] = useState(false);
  const [winner, setWinner] = useState(false);
  let countdown = moment(product.endingDate).fromNow(true);
  const user = personService.getCurrentUser();
  function placeBid() {
    if (highestBid >= bid) {
      showNotification(
        "warning",
        "There are higher bids than yours. You could give a second try!"
      );
    } else {
      bidService.placeBid(user.user.id, product.id, bid).then((response) => {
        if (response.data.includes("Succesful")) {
          showNotification("success", "Congrats! You are the highest bider!");
        }
      });
    }
  }

  useEffect(() => {
    if (moment(product.endingDate) <= moment.now()) setEnded(true);
    if (user) {
      if (user.user.id === product.person.id) {
        setNotSeller(false);
      }
      setBiddingEnabled("");
    } else {
      setBiddingEnabled("disabled");
      setWarningText("Please login or register to place a bid.");
    }
    bidService.getBidCount(product.id).then((response) => {
      setCount(response.data);
    });
    bidService.getHighestBid(product.id).then((response) => {
      if (response.data.length === 0) {
        setHighestBid(product.startingPrice);
      } else {
        setHighestBid(response.data.bid);
        if (user && response.data.person.id === user.user.id) {
          setBiddingEnabled("disabled");
          setWarningText("You cannot outbid yourself");
        }
        if (ended && showOnce.current) {
          showOnce.current = 0;
          if (user && response.data.person.id === user.user.id) {
            if (product.payed) {
              showNotification(
                "info",
                "You have successfully completed payment for this product"
              );
            } else {
              setWinner(true);
              showNotification(
                "info",
                "Congratulations! You outbid the competition."
              );
            }
          } else {
            showNotification("warning", "This auction has ended");
          }
        }
      }
    });
  }, [product, user, showNotification, ended]);

  return (
    <div className="info">
      <h2>{product.name}</h2>
      <h3>
        Start with <p>${product.startingPrice}</p>
      </h3>
      <div className="biddingInfo">
        <h3>
          Highest bid: <p>${highestBid}</p>
        </h3>
        <h3>
          Number of bids: <p>{count}</p>
        </h3>
        {!ended && (
          <h3>
            Time left: <p>{countdown}</p>
          </h3>
        )}
      </div>
      {notSeller && !ended && (
        <TooltipMessage
          className=""
          title={warningText}
          placement="top-end"
          arrow
        >
          <div className="bid">
            <Field
              placeHolder={`Enter $${highestBid + 1} or higher`}
              fieldClass={`placeBid ${biddingEnabled}`}
              id="placeBid"
              type="number"
              value={bid}
              onChange={(event) => setBid(event.target.value)}
              min="1"
            />
            <Button
              lable="Place bid"
              icon={
                <MdOutlineKeyboardArrowRight
                  className="buttonIcon"
                  viewBox="none"
                />
              }
              buttonClass={biddingEnabled + "Button purpleBorder"}
              onClick={() => placeBid()}
            />
          </div>
        </TooltipMessage>
      )}
      {ended && (
        <div className="paymentOption">
          <h1 className="sellerLabel">Seller:</h1>
          <Avatar src={product.person.picture} />
          <h2 className="sellerName">
            {product.person.firstName} {product.person.lastName}
          </h2>
          {winner && (
            <Button
              lable="Pay"
              icon={
                <MdOutlineKeyboardArrowRight
                  className="buttonIcon"
                  viewBox="none"
                />
              }
              onClick={() =>
                navigate("/payment", {
                  state: {
                    price: highestBid,
                    product: product.id,
                  },
                })
              }
              buttonClass="purpleBorder"
            />
          )}
        </div>
      )}

      <div className="desc">
        <h3>Details</h3>
      </div>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductInfo;
