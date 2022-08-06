import {React,useEffect,useState} from 'react';
import './notification.css'
function Notification({type}) {
    const [notificationText,setNotificationText] = useState();
    useEffect(()=>{
        switch(type) {
        case 'succes':
          setNotificationText("Congrats! You are the highest bidder.")
          break;
        case 'lower':
          setNotificationText("There are higher bids than yours. You could give a second try.")
          break;
      }
    },[type])
    
    return (
        <div className={`notification ${type}`}>
            <p>{notificationText}</p>
        </div>
    );
}

export default Notification;