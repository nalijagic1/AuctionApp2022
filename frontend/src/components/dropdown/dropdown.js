import React from 'react';
import "./dropdown.css"
import {IoIosArrowDown,IoIosArrowUp} from 'react-icons/io';
import { useState,useEffect } from 'react';

function Dropdown({title,content}) {
    const[showMenu,setShowMenu] = useState(false)
    return (
        <div className="dropdown">
            <div className='dropdownHeader'>
                {showMenu ? <IoIosArrowUp className="dropdownIcon" onClick={()=>setShowMenu(false)}/> : <IoIosArrowDown className="dropdownIcon" onClick={()=>setShowMenu(true)}/>}
                <h2>{title}</h2>
            </div>
            {showMenu &&
            <div className="dropdownContent">
                {content}
             </div>}
        </div>
    );
}

export default Dropdown;