import React from 'react';
import "./button.css"

function Button({lable, icon,onClick}) {

    return (
        <div className="button">
            <button className={lable.toLowerCase().includes("bid") ? 'bidding' : 'exploring'}
                    onClick={onClick}>{lable.toUpperCase()}
                {icon &&
                <img src={icon}></img>
                }
            </button>

        </div>
    );
}

export default Button;
