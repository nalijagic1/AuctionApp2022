import React from 'react';
import './card.css';
import {useEffect, useState} from "react";
import pictureService from '../../services/picture.service';

function Card({name, productId, price}) {
<<<<<<< HEAD
    const [image, setImage] = useState()
    useEffect(() => {
        pictureService.getProductPicture(productId).then((response) => {
            setImage(response.data);

        });
    }, []);
    return (
        <div class='card-container'>
            <div class="image-container">
                {image &&
                <img src={image[0].imageUrl} alt="Image"/>
=======
    const [image, setImage] = useState();
    useEffect(() => {
        pictureService.getProductCoverPicture(productId).then((response) => {
            setImage(response.data);

        });
    }, [productId]);
    return (
        <div className='card-container'>
            <div className="image-container">
                {image &&
                <img src={image.imageUrl} alt={name}/>
>>>>>>> main
                }

            </div>

<<<<<<< HEAD
            <div class="card-content">

                <div class="card-title">
                    <h2>{name}</h2>
                </div>

                <div class="card-body">
                    <p>Start price from <div> ${price}</div></p>
=======
            <div className="card-content">

                <div className="card-title">
                    <h2>{name}</h2>
                </div>

                <div className="card-body">
                    Start price from <p> ${price}</p>
>>>>>>> main
                </div>

            </div>

        </div>


    );

}

export default Card;
