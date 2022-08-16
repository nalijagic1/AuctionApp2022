import React from 'react';
import "./button.css"

function Button({lable, icon, onClick, buttonClass}) {
    return (
        <div className="button">
            <button type="button"
                    className={buttonClass}
                    onClick={onClick}>{lable.toUpperCase()}
                <i>{icon}</i>
            </button>

        </div>
    );
}

export default Button;
