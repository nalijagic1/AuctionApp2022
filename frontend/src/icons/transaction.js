import React from "react";

function Transaction({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0.5H2C0.89 0.5 0.00999999 1.39 0.00999999 2.5L0 14.5C0 15.61 0.89 16.5 2 16.5H18C19.11 16.5 20 15.61 20 14.5V2.5C20 1.39 19.11 0.5 18 0.5ZM18 14.5H2V8.5H18V14.5ZM18 4.5H2V2.5H18V4.5Z"
      />
    </svg>
  );
}

export default Transaction;
