import React, { useEffect, useState } from "react";
import "./notification.css";

function Notification({
  notificationType,
  notificationMessage,
  setShowNotification,
}) {
  useEffect(() => {
    setTimeout(function () {
      setShowNotification(false);
    }, 5000);
  }, []);
  return (
    <div>
      <div className={`notification notification${notificationType}`}>
        <p>{notificationMessage}</p>
      </div>
    </div>
  );
}

export default Notification;
