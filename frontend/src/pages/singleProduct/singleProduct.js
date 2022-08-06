import React, {useState, useEffect} from 'react';
import PathBar from '../../components/pathBar/pathBar';
import Gallery from '../../components/gallery/gallery';
import ProductInfo from '../../components/productInfo/productInfo';
import productService from '../../services/product.service';
import {useParams} from 'react-router-dom';
import Notification from '../../components/notification/notification';

import './singleProduct.css'

function SingleProduct() {
    const params = useParams();
    const [product, setProduct] = useState();
    const [showNotification,setShowNotification] = useState(false);
    const [notificationType,setNotificationType] = useState();
    useEffect(() => {
        productService.getSelectedProduct(parseInt(params.productId))
            .then((response) => {
                setProduct(response.data);

            });
    }, [params]);

    function displayNotification(type){
        setNotificationType(type);
        setShowNotification(true);
        setTimeout(function() {
            setShowNotification(false)
               }, 3000);
    }
    return (
        <div className="singleProduct">
            {product &&
            <div>
                <PathBar prop={{name: product.name, startPoint: "Shop", endPoint: "Single product"}}></PathBar>
                {showNotification && 
                    <Notification type ={notificationType}/>}
                <div className='productView'>
                    <Gallery productId={params.productId}/>
                    <ProductInfo product={product} showNotification={(type)=>displayNotification(type)}/>
                </div>
            </div>
            }
        </div>
    );
}

export default SingleProduct;
