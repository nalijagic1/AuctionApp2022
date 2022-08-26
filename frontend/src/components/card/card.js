import React from "react";
import "./card.css";
import { useEffect, useState } from "react";
import pictureService from "../../services/picture.service";
import { STATUS_CODES } from "../../utils/httpStatusCode";

function Card({ name, productId, price }) {
  const [image, setImage] = useState();
  useEffect(() => {
    pictureService.getProductCoverPicture(productId).then((response) => {
      if (response.status === STATUS_CODES.OK) setImage(response.data);
    });
  }, [productId]);
  return (
    <div className="card-container">
      <div className="image-container">
        {image && <img src={image.imageUrl} alt={name} />}
      </div>
      <div className="card-content">
        <div className="card-title">
          <h2>{name}</h2>
        </div>
        <div className="card-body">
          Start price from <p> ${price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
