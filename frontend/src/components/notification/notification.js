import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./notification.css";

function Notification({
  notificationType,
  notificationMessage,
  setShowNotification,
  exitable,
  link,
}) {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (!exitable) {
      setTimeout(function () {
        setShowAlert(false);
        setTimeout(function () {
          setShowNotification(false);
        }, 250);
      }, 5000);
    }
  }, []);
  return (
    <div className={showAlert ? "alert-shown" : "alert-hidden"}>
      <div className={`notification notification-${notificationType}`}>
        <p>{notificationMessage}</p>
        {link && <a href="/">{link}</a>}
        {exitable && <AiOutlineClose className="closeNotification" onClick={()=>setShowNotification(false)}></AiOutlineClose>}
      </div>
    </div>
  );
}

export default Notification;
