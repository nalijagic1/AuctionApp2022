import React, { useState, useEffect } from "react";
import PathBar from "../../components/pathBar/pathBar";
import Gallery from "../../components/gallery/gallery";
import ProductInfo from "../../components/productInfo/productInfo";
import productService from "../../services/product.service";
import { useParams } from "react-router-dom";
import "./singleProduct.css";
import Notification from "../../components/notification/notification";
import { STATUS_CODES } from "../../utils/httpStatusCode";
import Loader from "../../components/loader/loader";

function SingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loader,setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    productService
      .getSelectedProduct(parseInt(params.productId))
      .then((response) => {
        if (response.status === STATUS_CODES.OK) {setProduct(response.data);setLoader(false)};
      });
  }, [params]);

  function displayNotification(type, message) {
    setNotificationType(type);
    setShowNotification(true);
    setNotificationMessage(message);
  }

  return (
    <div className="singleProduct">

      {loader ? <Loader></Loader>: (product &&
        <div>
          <PathBar
            prop={{
              name: product.name,
              startPoint: "Shop",
              endPoint: "Single product",
            }}
          ></PathBar>
            {showNotification && (
              <Notification
                notificationMessage={notificationMessage}
                notificationType={notificationType}
                setShowNotification={(show) => setShowNotification(show)}
              />
            )}
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
