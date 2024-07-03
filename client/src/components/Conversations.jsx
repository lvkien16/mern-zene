import { useEffect, useState } from "react";
import { IoMdMore, IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import User from "./conversation/User";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import { Dropdown } from "flowbite-react";

const socket = io("http://localhost:3000");

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(
    localStorage.getItem("userIdForConversation") || ""
  );
  const location = useLocation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (location.pathname.startsWith("/message/")) {
      const userIdFromPath = location.pathname.split("/")[2];
      localStorage.setItem("userIdForConversation", userIdFromPath);
      setUserId(userIdFromPath);
    } else {
      localStorage.removeItem("userIdForConversation");
      setUserId("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const getCoversations = async () => {
      try {
        const res = await fetch(
          `/api/message/get/conversations/${currentUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCoversations();
  }, [currentUser._id, userId, messages]);

  useEffect(() => {
    if (!userId) return;
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/message/get/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [userId]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("unsend", (id) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    });

    return () => {
      socket.off("message");
      socket.off("unsend");
    };
  }, [messages]);

  const handleReadMessage = async () => {
    try {
      const res = await fetch(`/api/message/read/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      userId &&
      messages.length > 0 &&
      messages[messages.length - 1].sender === userId
    ) {
      const autoReadMessage = async () => {
        try {
          const res = await fetch(`/api/message/read/${userId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          const data = await res.json();
          console.log("data", data);
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };
      autoReadMessage();
    }
  }, [userId, messages]);

  const handleDeleteConversation = async (sender, receiver) => {
    try {
      const res = await fetch(
        `/api/message/deleteconversation/${
          currentUser._id === sender ? receiver : sender
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary rounded-lg px-2">
      <div className="title py-2 text-center border-b border-primary">
        <h3 className="font-semibold text-primary">Conversations</h3>
      </div>
      <div className="search mt-2 flex items-center gap-1">
        <input
          type="text"
          placeholder="Search..."
          className="border border-primary rounded-lg bg-secondary text-primary outline-none px-1 w-full"
        />
        <button className="border border-primary py-1 px-2 flex justify-center rounded-lg bg-primary text-secondary hover:bg-transparent hover:text-primary">
          <IoMdSearch />
        </button>
      </div>
      <div className="conversations mt-2">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            <div key={index} className="flex items-center">
              <Link
                to={`/message/${
                  currentUser._id === conversation.receiver
                    ? conversation.sender
                    : conversation.receiver
                }`}
                onClick={handleReadMessage}
                className="w-full"
              >
                <User
                  conversation={conversation}
                  userId={userId}
                  messages={messages}
                />
              </Link>
              <span className="">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<IoMdMore className={`text-primary text-xl `} />}
                >
                  <Dropdown.Item
                    onClick={() =>
                      handleDeleteConversation(
                        conversation.sender,
                        conversation.receiver
                      )
                    }
                    className="text-primary hover:!bg-primary hover:text-white"
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown>
              </span>
            </div>
          ))
        ) : (
          <p className="text-primary text-center">No Conversations</p>
        )}
      </div>
    </div>
  );
}
