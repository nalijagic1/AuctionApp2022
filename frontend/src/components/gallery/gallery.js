import React, { useState, useEffect } from "react";
import "./gallery.css";
import pictureService from "../../services/picture.service";
import { STATUS_CODES } from "../../utils/httpStatusCode";

function Gallery({ productId }) {
  const [shown, setShown] = useState([]);
  const [pictures, setPicture] = useState([]);
  useEffect(() => {
    pictureService.getProductPictures(productId).then((response) => {
      if (response.status === STATUS_CODES.OK) setPicture(response.data);
    });
    pictureService.getProductCoverPicture(productId).then((response) => {
      if (response.status === STATUS_CODES.OK) setShown(response.data.imageUrl);
    });
  }, [productId]);
  return (
    <div className="gallery">
      <div>
        <div className="mainPicture">
          <img src={shown} alt="Main"></img>
        </div>
        <div className="pictureGrid">
          {pictures.map((picture) => (
            <img
              key={picture.id}
              value={picture}
              src={picture.imageUrl}
              onClick={(event) => setShown(event.target.src)}
              alt="Item"
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
