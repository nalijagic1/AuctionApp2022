import React from "react";
import "./auctionItem.css";
import { useState, useEffect } from "react";
import pictureService from "../../services/picture.service";
import productService from "../../services/product.service";
var firstRender = false;

function AuctionItem({ productId, amount, loadingState }) {
  const [product, setProduct] = useState();
  const [coverPicture, setCoverPicture] = useState();
  useEffect(() => {
    if (!firstRender) loadingState(true);
    pictureService.getProductCoverPicture(productId).then((response) => {
      setCoverPicture(response.data);
    });
    productService.getSelectedProduct(productId).then((response) => {
      setProduct(response.data);
      if (!firstRender) {
        loadingState(false);
        firstRender = true;
      }
    });
  }, [productId]);
  return (
    <div>
      <div className="auctionHeaders">
        <h2>Auction item</h2>
        <div>
          <h2 className="auctionPrice">Price</h2>
        </div>
      </div>
      <hr />
      <div className="auctionItem">
        {coverPicture && <img alt={product.name} src={coverPicture.imageUrl} />}
        {product && (
          <div className="auctionItemInfo">
            <h1>{product.name}</h1>
            <h3>#{product.id}</h3>
          </div>
        )}
        <h2>${amount}</h2>
      </div>
    </div>
  );
}

export default AuctionItem;
