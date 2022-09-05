import React from "react";

function Messages({ className }) {
  return (
    <svg
    className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2H18V14H3.17L2 15.17V2ZM2 0C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0H2ZM4 10H16V12H4V10ZM4 7H16V9H4V7ZM4 4H16V6H4V4Z"
      />
    </svg>
  );
}

export default Messages;
