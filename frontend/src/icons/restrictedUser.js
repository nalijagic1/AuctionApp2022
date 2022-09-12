import React from "react";

function RestrictedUser({color="#8367D8",className}) {
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
        d="M11.5 18L3 17.9997V14.9997C4 13.4998 8.5 11.5003 12 13"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="10" cy="7" r="3.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M18.6578 13H15.3422L13 15.3422V18.6578L15.3422 21H18.6578L21 18.6578V15.3422L18.6578 13ZM20.1111 18.2889L18.2889 20.1111H15.7111L13.8889 18.2889V15.7111L15.7111 13.8889H18.2889L20.1111 15.7111V18.2889Z"
        fill={color}
      />
      <path
        d="M16.9991 19.2229C17.2446 19.2229 17.4436 19.0239 17.4436 18.7784C17.4436 18.533 17.2446 18.334 16.9991 18.334C16.7537 18.334 16.5547 18.533 16.5547 18.7784C16.5547 19.0239 16.7537 19.2229 16.9991 19.2229Z"
        fill={color}
      />
      <path
        d="M16.5547 14.7793H17.4436V17.8904H16.5547V14.7793Z"
        fill={color}
      />
    </svg>
  );
}

export default RestrictedUser;
