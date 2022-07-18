import React, {useState, useEffect} from 'react';
import PathBar from '../../components/pathBar/pathBar';
import Gallery from '../../components/gallery/gallery';
import ProductInfo from '../../components/productInfo/productInfo';
import productService from '../../services/product.service';
import {useParams} from 'react-router-dom';

import './singleProduct.css'

function SingleProduct() {
    const params = useParams();
    const [product, setProduct] = useState();
    useEffect(() => {
        productService.getSelectedProduct(parseInt(params.productId))
            .then((response) => {
                setProduct(response.data);

            });
    }, [params]);
    return (
        <div className="singleProduct">
            {product &&
            <div>
                <PathBar prop={{name: product.name, startPoint: "Shop", endPoint: "Single product"}}></PathBar>
                <div className='productView'>
                    <Gallery productId={params.productId}/>
                    <ProductInfo product={product}/>
                    <></>
                </div>
            </div>
            }
        </div>
    );
}

export default SingleProduct;
