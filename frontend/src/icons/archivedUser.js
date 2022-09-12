import React from "react";

function ArchivedUser({color = "#8367D8",className}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.5 18L3 17.9997V14.9997C4 13.4998 8.5 11.5003 12 13" stroke={color} strokeWidth="1.5"/>
    <circle cx="10" cy="7" r="3.25" stroke={color} strokeWidth="1.5"/>
    <path d="M20.7956 13.9911L20.1778 13.2444C20.0578 13.0933 19.8756 13 19.6667 13H14.3333C14.1244 13 13.9422 13.0933 13.8178 13.2444L13.2044 13.9911C13.0756 14.1422 13 14.3422 13 14.5556V20.1111C13 20.6 13.4 21 13.8889 21H20.1111C20.6 21 21 20.6 21 20.1111V14.5556C21 14.3422 20.9244 14.1422 20.7956 13.9911ZM14.44 13.8889H19.56L19.92 14.32H14.0844L14.44 13.8889ZM13.8889 20.1111V15.2222H20.1111V20.1111H13.8889ZM17.6444 16.1111H16.3556V17.4444H15.2222L17 19.2222L18.7778 17.4444H17.6444V16.1111Z" fill={color}/>
    </svg>
  );
}

export default ArchivedUser;
