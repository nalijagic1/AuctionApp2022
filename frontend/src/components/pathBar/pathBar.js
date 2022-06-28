import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './pathBar.css'

function PathBar({prop}) {
  const [link,setLink] = useState();
  useEffect(() => {
    if(prop.startPoint =="Home") setLink("/")
  });
  return(
    <div className="bar">
        <div className='locationName'>
            <h2>{prop.name}</h2>
        </div>
        <div className='path'>
           <Breadcrumb>
           <Breadcrumb.Item href ={link}>{prop.startPoint} </Breadcrumb.Item>
           <Breadcrumb.Item active>{prop.endPoint}</Breadcrumb.Item>
           </Breadcrumb>
        </div>
      </div>
  );
}

export default PathBar; 