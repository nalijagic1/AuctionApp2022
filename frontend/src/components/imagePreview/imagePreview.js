import React from "react";
import "./imagePreview.css";
import {MdReorder} from "react-icons/md"
import {AiOutlineMinusCircle} from "react-icons/ai"

function ImagePreview(props) {
  return (
    <div className="imagePreview">
        <MdReorder className="reorderIcon"/>
        <img src={props.image} alt="ImagePreview"/>
        <h4>{props.name}</h4>
        <AiOutlineMinusCircle onClick={()=> props.deleteImage(props.index)} className="deleteIcon"/>
    </div>
  );
}

export default ImagePreview;
