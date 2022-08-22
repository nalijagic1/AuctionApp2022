import React, { useEffect, useState } from "react";
import "./notification.css";

function Notification({
  notificationType,
  notificationMessage,
  showNotification,
}) {
  const [showAlert, setShowAlert] = useState(showNotification);
  useEffect(() => {
    if (showNotification === true) {
      setShowAlert(true);
      setTimeout(function () {
        setShowAlert(false);
      }, 5000);
    }
  }, [showNotification,notificationType,notificationMessage]);
  return (
    <div>
      <div
        className={`notification notification${notificationType} ${
          showAlert ? "alert-shown" : "alert-hidden"
        }`}
      >
        <p>{notificationMessage}</p>
      </div>
    </div>
  );
}

export default Notification;
