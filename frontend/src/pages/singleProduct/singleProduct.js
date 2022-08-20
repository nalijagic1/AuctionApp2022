import React, { useState, useEffect } from "react";
import PathBar from "../../components/pathBar/pathBar";
import Gallery from "../../components/gallery/gallery";
import ProductInfo from "../../components/productInfo/productInfo";
import productService from "../../services/product.service";
import { useParams } from "react-router-dom";
import "./singleProduct.css";
import Notification from "../../components/notification/notification";

function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  useEffect(() => {
    productService
      .getSelectedProduct(parseInt(params.productId))
      .then((response) => {
        if (response.status === 200) setProduct(response.data);
      });
  }, [params]);

  function displayNotification(type, message) {
    setNotificationType(type);
    setShowNotification(true);
    setNotificationMessage(message);
  }

  return (
    <div className="singleProduct">
      {product && (
        <div>
          <PathBar
            prop={{
              name: product.name,
              startPoint: "Shop",
              endPoint: "Single product",
            }}
          ></PathBar>
          <Notification
            showNotification={showNotification}
            notificationMessage={notificationMessage}
            notificationType={notificationType}
          />
          <div className="productView">
            <Gallery productId={params.productId} />
            <ProductInfo
              product={product}
              showNotification={(type, message) =>
                displayNotification(type, message)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
