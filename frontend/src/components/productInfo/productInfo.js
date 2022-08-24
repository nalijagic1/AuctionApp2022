import React, { useEffect, useState, useRef } from "react";
import Field from "../field/field";
import Button from "../button/button";
import "./productInfo.css";
import bidService from "../../services/bid.service";
import moment from "moment";
import personService from "../../services/person.service";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TooltipMessage from "../tooltipMessage/tooltipMessage";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_MESSAGES,
} from "../../utils/notificationConstants";
import { STATUS_CODES } from "../../utils/httpStatusCode";

function ProductInfo({ product, showNotification }) {
  const [highestBid, setHighestBid] = useState(0);
  const [count, setCount] = useState(0);
  const [biddingEnabled, setBiddingEnabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [bid, setBid] = useState("");
  const [notSeller, setNotSeller] = useState(true);
  const [ended, setEnded] = useState(false);
  let countdown = moment(product.endingDate).fromNow(true);
  const user = personService.getCurrentUser();
  const showOnce = useRef(1);

  function placeBid() {
    if (bid === "") {
      showNotification(
        NOTIFICATION_TYPES.WARNING,
        NOTIFICATION_MESSAGES.NO_BID
      );
    } else if (highestBid >= bid) {
      showNotification(
        NOTIFICATION_TYPES.WARNING,
        NOTIFICATION_MESSAGES.BID_HIGHER_MESSAGE
      );
    } else {
      bidService.placeBid(user.id, product.id, bid).then((response) => {
        showNotification(
          NOTIFICATION_TYPES.SUCCESS,
          NOTIFICATION_MESSAGES.SUCCESS_MESSAGE
        );
      });
    }
  }

  useEffect(() => {
    if (moment(product.endingDate) <= moment.now()) setEnded(true);
    if (user) {
      if (user.id === product.person.id) {
        setNotSeller(false);
      }
      setBiddingEnabled(true);
    } else {
      setBiddingEnabled(false);
      setWarningText("Please login or register to place a bid.");
    }
    bidService.getBidCount(product.id).then((response) => {
      if (response.status === STATUS_CODES.OK) setCount(response.data);
    });
    bidService.getHighestBid(product.id).then((response) => {
      if (response.status === STATUS_CODES.OK) {
        if (response.data.length === 0) {
          setHighestBid(product.startingPrice);
        } else {
          setHighestBid(response.data.bid);
          if (user && response.data.person.id === user.id) {
            if (!ended && showOnce.current) {
              showNotification(
                NOTIFICATION_TYPES.SUCCESS,
                NOTIFICATION_MESSAGES.SUCCESS_MESSAGE
              );
            }
            showOnce.current = 0;
            setBiddingEnabled(false);
            setWarningText("You cannot outbid yourself");
          }
        }
      }
    });
  }, [product, user]);

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
              fieldClass={biddingEnabled ? `placeBid` : "placeBid disabled"}
              id="placeBid"
              type="number"
              onKeyUp={(event) => setBid(event.target.value)}
            />
            <Button
              label="Place bid"
              icon={
                <MdOutlineKeyboardArrowRight
                  className="buttonIcon"
                  viewBox="none"
                />
              }
              buttonClass={
                biddingEnabled ? "bidding" : "disabledButton bidding"
              }
              onClick={() => placeBid()}
            />
          </div>
        </TooltipMessage>
      )}

      <div className="desc">
        <h3>Details</h3>
      </div>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductInfo;
