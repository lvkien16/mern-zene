import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Notification({ notification }) {
  const [fromUser, setFromUser] = useState({});
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    const getFromUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${notification.fromUser}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setFromUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFromUser();
  }, [notification.fromUser, notification]);

  const handleReadNotification = async (id) => {
    setIsRead(true);
    try {
      await fetch(`/api/notification/readnotification/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      notification = await notification.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={notification.link}
      className={`flex gap-2 px-2 items-center py-2 border-b border-primary ${
        !isRead ? "bg-primary text-white" : "bg-transparent text-primary"
      }`}
      onClick={() => handleReadNotification(notification._id)}
    >
      <div>
        <img
          src={fromUser.profilePicture}
          alt={fromUser.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex gap-1">
        <p className="font-semibold ">{fromUser.name}</p>
        <p className="">{notification.title}</p>
      </div>
    </Link>
  );
}
