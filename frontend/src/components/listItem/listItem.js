import React from "react";
import "./listItem.css";
import { STATUS_CODES } from "../../utils/httpStatusCode";
import { useState, useEffect } from "react";
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
        <h2>{productName}</h2>
        <p>{productDescription}</p>
      </div>
    </div>
  );
}

export default ListItem;
