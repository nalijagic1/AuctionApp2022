
import React from 'react';
import "./button.css"

function Button({lable, icon, onClick,buttonClass}) {
    const userManagment = lable.toLowerCase().includes("explore") ? "":" userManagment";
    return (
        <div className="button">
            <button type ="button" className={lable.toLowerCase().includes("bid") ? `bidding ${buttonClass}` : `purpleButton${userManagment} ${buttonClass}`}
                    onClick={onClick}>{lable.toUpperCase()}
               <i>{icon}</i>
            </button>

        </div>
    );
}

export default Button;
