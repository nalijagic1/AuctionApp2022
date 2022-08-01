import React from 'react';
import './field.css'

function Field({placeHolder,fieldClass,label,type,id,onKeyUp}) {

    return (
        <div className="field">
            {label && <label>{label}</label>}
            <input type={type} className={fieldClass} id={id} placeholder={placeHolder} onKeyUp ={onKeyUp}></input>
        </div>
    );
}

export default Field;
