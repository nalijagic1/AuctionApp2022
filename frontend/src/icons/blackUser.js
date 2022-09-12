import React from "react";

function BlackUser({color="#8367D8",className}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.5 18L2 17.9997V14.9997C3 13.4998 7.5 11.5003 11 13"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="9" cy="7" r="3.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M18.6662 19.6662L18.2218 19.2218L13.7773 14.7773"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="16" cy="17" r="3.4" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export default BlackUser;
