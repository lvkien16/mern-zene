import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import SendMessage from "../components/message/SendMessage";
import Messages from "../components/message/Messages";

const socket = io("http://localhost:3000");

export default function Message() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [elementWidth, setElementWidth] = useState(0);
  const bottomRef = useRef(null);
  const elementRef = useRef(null);

  const updateWidth = () => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("unsend", (id) => {
      setMessages(messages.filter((message) => message._id !== id));
    });
    socket.on("deleteConversation", (messages) => {
      setMessages(
        messages.filter(
          (message) => message.sender !== userId && message.receiver !== userId
        )
      );
    });
    return () => {
      socket.off("message");
      socket.off("unsend");
      socket.off("deleteConversation");
    };
  }, [messages, userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/message/get/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [userId]);

  return (
    <>
      {user ? (
        <div className="relative" ref={elementRef}>
          <div className="p-2 flex items-center gap-3 shadow border-primary">
            <img
              src={user.profilePicture}
              alt=""
              className="h-12 w-12 rounded-full border"
            />
            <p className="text-primary font-semibold">{user.name}</p>
          </div>
          <div className="px-2 h-screen-64px-header overflow-y-auto">
            <div className="flex flex-col gap-2 mt-3">
              {messages && messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message._id}>
                    <Messages
                      message={message}
                      setMessages={setMessages}
                      user={user}
                      messages={messages}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-primary">No messages yet</p>
              )}
              <div ref={bottomRef}></div>
            </div>
          </div>
          <div
            className="p-2 fixed bottom-0 bg-secondary w-full"
            style={{ width: elementWidth }}
          >
            <SendMessage
              userId={userId}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
