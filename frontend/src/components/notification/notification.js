import React, { useEffect, useState } from "react";
import "./notification.css";

function Notification({
  notificationType,
  notificationMessage,
  setShowNotification,
}) {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowAlert(false);
      setTimeout(function () {
        setShowNotification(false);
      }, 250);
    }, 5000);
  }, []);
  return (
    <div className={showAlert ? "alert-shown" : "alert-hidden"}>
      <div className={`notification notification${notificationType}`}>
        <p>{notificationMessage}</p>
      </div>
    </div>
  );
}

export default Notification;
