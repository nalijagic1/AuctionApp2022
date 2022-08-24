import React from "react";
import "./notification.css";

function Notification({ notificationType, notificationMessage }) {
  return (
    <div>
      <div className={`notification notification${notificationType}`}>
        <p>{notificationMessage}</p>
      </div>
    </div>
  );
}

export default Notification;
