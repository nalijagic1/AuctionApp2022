import React, { useState, useEffect, useRef } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./pathBar.css";

function PathBar({ prop }) {
  var classType = useRef("path");
  const [link, setLink] = useState();
  useEffect(() => {
    if (prop.startPoint === "Home") setLink("/");
    else if (prop.startPoint === "Shop") setLink("/shop/all");
    else if(prop.startPoint === "User Management") {setLink("/userManagement"); classType.current += " adminPath";
  
  }
    if (prop.endPoint.includes("Search")) classType.current += " searchPath";
  }, [prop]);
  return (
    <div className="bar">
      {prop.name !== "" && <div className="locationName">{prop.name}</div>}
      <div className={classType.current}>
        <Breadcrumb>
          <Breadcrumb.Item href={link} onClick={prop.onClick ? ()=>prop.onClick() : undefined}>{prop.startPoint} </Breadcrumb.Item>
          {prop.paths &&
            prop.paths.map((path) => {
              return <Breadcrumb.Item key="0">{path}</Breadcrumb.Item>;
            })}
          <Breadcrumb.Item active>{prop.endPoint}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default PathBar;
