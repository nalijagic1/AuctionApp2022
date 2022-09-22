import React from "react";
import "./productHightlight.css";
import productService from "../../services/product.service";
import pictureService from "../../services/picture.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { STATUS_CODES } from "../../utils/httpStatusCode";

function ProductHighlight({isLoading}) {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();
  useEffect(() => {
    //isLoading(true)
    productService.getHighlighted().then((response) => {
      if (response.status === STATUS_CODES.OK) {
        setProduct(response.data);
        pictureService
          .getProductCoverPicture(response.data.id)
          .then((response) => {
            if (response.status === STATUS_CODES.OK) {setImage(response.data); 
              //isLoading(false)
            };
          });
      }
    });
  }, []);
  return (
    <div className="highlight">
      <Link to={`/product/${product.id}`}>
        <div className="productInfo">
          <h3 className="nameProduct">{product.name}</h3>
          <h3 className="priceProduct">Start from ${product.startingPrice}</h3>
          <div className="descProduct">{product.description}</div>
          <div className="bidNow">
            <Button
              label="Bid now"
              buttonClass="purpleBorder"
              icon={
                <MdOutlineKeyboardArrowRight
                  className="buttonIcon"
                  viewBox="none"
                />
              }
            />
          </div>
        </div>
        {image && <img src={image.imageUrl} alt={product.name} />}
      </Link>
    </div>
  );
}

export default ProductHighlight;
