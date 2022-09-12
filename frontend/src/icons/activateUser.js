import React from "react";

function ActivateUser({color = "#8367D8",className}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M12 18.5L3.5 18.4997V15.4997C4.5 13.9998 9 12.0003 12.5 13.5" stroke={color} stroke-width="1.5"/>
<circle cx="10.5" cy="7.5" r="3.25" stroke={color} stroke-width="1.5"/>
<path d="M12.5843 15.4302L12.5138 15.3597L12.4431 15.43L11.8514 16.0175L11.7802 16.0882L11.8512 16.1591L14.1803 18.4883L14.251 18.559L14.3218 18.4883L19.3218 13.4883L19.3925 13.4176L19.3218 13.3469L18.7343 12.7594L18.6636 12.6887L18.5929 12.7593L14.2511 17.097L12.5843 15.4302Z" fill={color} stroke={color} stroke-width="0.2"/>
</svg>
  );
}

export default ActivateUser;
