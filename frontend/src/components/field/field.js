import React from 'react';
import './field.css'

function Field({placeHolder}) {

  return(
    <div className="field">
        <form>
            <input type="text" placeholder={placeHolder}></input>
        </form>
    </div>
  );
}

export default Field;
