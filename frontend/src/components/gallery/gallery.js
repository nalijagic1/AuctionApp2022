import React, {useState, useEffect} from 'react';
import './gallery.css'
import pictureService from '../../services/picture.service';

function Gallery({productId}) {
    const [shown, setShown] = useState([]);
    const [pictures, setPicture] = useState([]);
    useEffect(() => {
<<<<<<< HEAD
        pictureService.getProductPicture(productId).then((response) => {
            setPicture(response.data);
            setShown(response.data[0].imageUrl);
            document.getElementsByClassName("pictureGrid")[0].addEventListener('click', (event) => {
                if (event.target.tagName.toLowerCase() === "img") setShown(event.target.src);
            });
        });
    }, []);
    return (
        <div className="gallery">
            <div>
                <img className='mainPicture' src={shown}></img>
                <div className="pictureGrid">
                    {pictures.map(picture => (
                        <img value={picture} src={picture.imageUrl}></img>
=======
        pictureService.getProductPictures(productId).then((response) => {
            setPicture(response.data);
        });
        pictureService.getProductCoverPicture(productId).then((response) =>{
            setShown(response.data.imageUrl);
        })
    }, [productId]);
    return (
        <div className="gallery">
            <div>
                <img className='mainPicture' src={shown} alt="Main"></img>
                <div className="pictureGrid">
                    {pictures.map(picture => (
                        <img  key ={picture.id} value={picture} src={picture.imageUrl} onClick={event =>  setShown(event.target.src)} alt="Item"></img>
>>>>>>> main
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;
