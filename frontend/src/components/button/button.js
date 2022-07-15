import React from 'react';
import "./button.css"

function Button({lable, icon}) {

    return (
        <div className="button">
            <button className={lable.toLowerCase().includes("bid") ? 'bidding' : 'exploing'}>{lable.toUpperCase()}
                {icon = !"" &&
                    <img src={icon} alt=""></img>
                }
            </button>

        </div>
    );
}

export default Button;
