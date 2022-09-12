import React from "react";

function GoldenUser({color ="#8367D8",className}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M13.5 18L5 17.9997V14.9997C6 13.4998 10.5 11.5003 14 13" stroke={color} strokeWidth="1.5"/>
<circle cx="12" cy="7" r="3.25" stroke={color} strokeWidth="1.5"/>
<path d="M19.5833 16.8637V13H15V16.8637C15 17.0242 15.0825 17.1754 15.2246 17.2579L17.1404 18.4083L16.6867 19.4808L15.1237 19.6137L16.3108 20.6404L15.9487 22.1667L17.2917 21.3554L18.6346 22.1667L18.2771 20.6404L19.4642 19.6137L17.9012 19.4808L17.4475 18.4083L19.3633 17.2579C19.5008 17.1754 19.5833 17.0287 19.5833 16.8637ZM16.8333 17.1571L15.9167 16.6071V13.9167H16.8333V17.1571ZM18.6667 16.6071L17.75 17.1571V13.9167H18.6667V16.6071Z" fill={color}/>
</svg>
  );
}

export default GoldenUser;
