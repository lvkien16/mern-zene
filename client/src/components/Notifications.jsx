import { useEffect, useState } from "react";
import Notification from "./notification/Notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetch("/api/notification/getnotifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);

  return (
    <div className="bg-secondary rounded-lg px-2 h-full">
      <div className="title text-center py-2 font-semibold text-primary border-b border-primary">
        Notifications
      </div>
      <div className="notifications">
        {notifications.map((notification) => (
          <div key={notification._id} className="notification">
            <Notification notification={notification} />
          </div>
        ))}
      </div>
    </div>
  );
}
