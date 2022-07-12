import React, {useState, useEffect} from 'react';
import './gallery.css'
import pictureService from '../../services/picture.service';

function Gallery({productId}) {
    const [shown, setShown] = useState([]);
    const [pictures, setPicture] = useState([]);
    useEffect(() => {
        pictureService.getProductPicture(productId).then((response) => {
            setPicture(response.data);
            setShown(response.data[0].imageUrl);
            document.getElementsByClassName("pictureGrid")[0].addEventListener('click', (event) => {
                if(event.target.tagName.toLowerCase()==="img") setShown(event.target.src);
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
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;
