import React from 'react';
import './card.css';
import {useEffect, useState} from "react";
import pictureService from '../../services/picture.service';

function Card({name, productId, price}) {
    const [image, setImage] = useState();
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
                }

            </div>

            <div class="card-content">

                <div class="card-title">
                    <h2>{name}</h2>
                </div>

                <div class="card-body">
                    <p>Start price from <div> ${price}</div></p>
                </div>

            </div>

        </div>


    );

}

export default Card;
