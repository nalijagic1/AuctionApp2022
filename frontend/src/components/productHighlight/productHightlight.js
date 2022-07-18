import React from 'react';
import "./productHightlight.css"
import productService from '../../services/product.service';
import pictureService from '../../services/picture.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Button from '../button/button';
import arrow from "../../images/arrow.png"

function ProductHighlight() {
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState();
    useEffect(() => {
        productService.getHighlighted()
            .then((response) => {
                setProduct(response.data);
                pictureService.getProductCoverPicture(response.data.id).then((response) => {
                    setImage(response.data);
                });
            });
    }, []);
    return (
        <div className="highlight">
            <Link to={`/product/${product.id}`}>
                <div className='productInfo'>
                <h3 className='nameProduct'>{product.name}</h3>
                <h3 className='priceProduct'>Start from ${product.startingPrice}</h3>
                <div className='descProduct'>
                    {product.description}
                </div>

                <div className='bidNow'>
                    <Button lable="Bid now" icon={arrow}/>
                </div>
            </div>
            {image &&
            <img src={image.imageUrl} alt={product.name}/>}
            </Link>
        </div>
    );
}

export default ProductHighlight;
