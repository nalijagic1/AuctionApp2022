import React from 'react';
import "./button.css"

function Button({lable, icon, onClick}) {
    const userManagment = lable.toLowerCase().includes("explore") ? "":" userManagment"
    return (
        <div className="button">
            <button type ="button" className={lable.toLowerCase().includes("bid") ? 'bidding' : `purpleButton${userManagment}`}
                    onClick={onClick}>{lable.toUpperCase()}
                {icon &&
                <img src={icon} alt=""></img>
                }
            </button>

        </div>
    );
}

export default Button;
