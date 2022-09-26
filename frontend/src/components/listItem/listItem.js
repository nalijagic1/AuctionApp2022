import React from "react";
import "./listItem.css";
import { STATUS_CODES } from "../../utils/httpStatusCode";
import { useState, useEffect } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Button from "../button/button";
import pictureService from "../../services/picture.service";

function ListItem({
  productId,
  productName,
  productDescription,
  productPrice,
}) {
  const [image, setImage] = useState();
  useEffect(() => {
    pictureService.getProductCoverPicture(productId).then((response) => {
      if (response.status === STATUS_CODES.OK) setImage(response.data);
    });
  }, [productId]);
  return (
    <div className="listItem">
      {image && (
        <div className="listImage">
          <img src={image.imageUrl}></img>
        </div>
      )}
      <div className="listItemInfo">
        <Button
          label="Bid"
          buttonClass="grayBorder"
          icon={
            <RiMoneyDollarCircleLine className="moneyIcon"/>
          }
        ></Button>
        <h2>{productName}</h2>
        <p>{productDescription}</p>
        <h3>Start from ${productPrice}</h3>
        
      </div>
    </div>
  );
}

export default ListItem;
