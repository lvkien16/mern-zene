import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "../Moment";

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
      className={`relative w-full conversation flex items-center gap-2 p-2 border-b border-primary ${
        userId === user._id ? "bg-primary" : ""
      }`}
    >
      <img
        src={user.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div className="w-full">
        <h4
          className={` font-semibold ${
            userId === user._id ? "text-white" : "text-primary"
          }`}
        >
          {user.name}
        </h4>
        <div
          className={` flex items-center justify-between w-2/3 ${
            userId === user._id ? "text-white" : "text-primary"
          }`}
        >
          <p
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-sm ${
              lastMessage &&
              lastMessage.read === false &&
              lastMessage.sender !== currentUser._id
                ? "font-bold"
                : ""
            }`}
          >
            {lastMessage && lastMessage.sender === currentUser._id && "You: "}
            {lastMessage && lastMessage.text}
          </p>
        </div>
      </div>
      <div className="absolute right-0 ms-auto flex gap-2 unread-messages">
        <div
          className={`pr-2 ${
            userId === user._id ? "text-white" : "text-primary"
          } text-sm`}
        >
          <div
            className={`${userId === user._id ? "text-white" : "text-primary"}`}
          >
            <Moment date={lastMessage && lastMessage.createdAt} />
          </div>
        </div>
        {unreadMessages > 0 && (
          <span className=" rounded-full w-5 h-5 flex text-sm justify-center bg-primary text-white">
            {unreadMessages}
            {unreadMessages > 9 && "++"}
          </span>
        )}
      </div>
    </div>
  );
}
