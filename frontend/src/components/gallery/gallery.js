import React, {useState, useEffect} from 'react';
import './gallery.css'
import pictureService from '../../services/picture.service';

function Gallery({productId}) {
    const [shown, setShown] = useState([]);
    const [pictures, setPicture] = useState([]);
    function onImageClick(event){
        if (event.target.tagName.toLowerCase() === "img") setShown(event.target.src);
    }
    useEffect(() => {
        pictureService.getProductPictures(productId).then((response) => {
            setPicture(response.data);
            setShown(response.data[0].imageUrl);
        });
    }, [productId]);
    return (
        <div className="gallery">
            <div>
                <img className='mainPicture' src={shown} alt="Main"></img>
                <div className="pictureGrid">
                    {pictures.map(picture => (
                        <img  key ={picture.id} value={picture} src={picture.imageUrl} onClick={onImageClick} alt="Item"></img>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;
