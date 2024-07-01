import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function User({ conversation, userId, messages }) {
  const [user, setUser] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `/api/user/getuser/${
            currentUser._id === conversation.sender
              ? conversation.receiver
              : conversation.sender
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser._id, messages]);

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await fetch(
          `/api/message/getlastmessage/${conversation.sender}/${conversation.receiver}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setLastMessage(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLastMessage();
  }, [conversation.sender, conversation.receiver, messages]);

  useEffect(() => {
    const getUnreadMessages = async () => {
      try {
        const res = await fetch(
          `/api/message/get/unreadmessages/${conversation.receiver}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setUnreadMessages(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getUnreadMessages();
  }, [conversation.receiver, currentUser._id, messages]);

  return (
    <div
      to={`/message/${conversation.receiver}`}
      className={`relative w-full conversation flex items-center gap-2 p-2 border-b border-primary  ${
        userId === conversation.receiver && "bg-primary"
      } ${!userId && userId !== conversation.receiver && ""}`}
    >
      <img
        src={user.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div className="w-full">
        <h4
          className={` font-semibold ${
            userId === conversation.receiver ? "text-white" : "text-primary"
          }`}
        >
          {user.name}
        </h4>
        <div
          className={` flex items-center justify-between w-2/3 ${
            userId === conversation.receiver ? "text-white" : "text-primary"
          }`}
        >
          <p
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-sm ${
              lastMessage.read === false &&
              lastMessage.sender !== currentUser._id &&
              "font-bold"
            }`}
          >
            {conversation.sender === currentUser._id && "You: "}
            {lastMessage.text}
          </p>
        </div>
      </div>
      {unreadMessages > 0 && (
        <div className="absolute right-0 ms-auto flex unread-messages">
          <span className=" rounded-full w-5 h-5 flex text-sm justify-center bg-primary text-white">
            {unreadMessages}
            {unreadMessages > 9 && "++"}
          </span>
        </div>
      )}
    </div>
  );
}
