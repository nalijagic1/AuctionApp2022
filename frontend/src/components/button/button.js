import React from 'react';
import "./button.css"
function Button({lable,icon}) {

  return(
    <div class="button">
      <button className={lable.toLowerCase().includes("bid") ? 'bidding' : 'exploing'}>{lable.toUpperCase()}  
        {icon=!"" &&
            <img src={icon}></img>
        }  
      </button>
 
    </div>
  );
}

export default Button;