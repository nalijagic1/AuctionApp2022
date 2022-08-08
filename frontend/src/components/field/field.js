import {React} from 'react';
import './field.css'

function Field({placeHolder,fieldClass,label,type,id,onKeyUp,error}) {
    return (
        <div className="field">
            {label && <label>{label}</label>}
            <input type={type} className={fieldClass} id={id} name={id} placeholder={placeHolder} onKeyUp ={onKeyUp} min='1'></input>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Field;
