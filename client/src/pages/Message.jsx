import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Message() {
  const { currentUser } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
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
    return () => {
      socket.off("message");
    };
  }, [messages]);

  useEffect(() => {
    const getConversationAndMessages = async () => {
      try {
        let res = await fetch(`/api/conversation/getconversation/${userId}`);
        let data = await res.json();
        if (!data) {
          res = await fetch(`/api/conversation/create/${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              members: [userId],
            }),
          });
          data = await res.json();
        }
        setConversation(data);
        res = await fetch(`/api/message/get/${data._id}`);
        const messagesData = await res.json();
        setMessages(messagesData);
      } catch (error) {
        console.log(error);
      }
    };
    getConversationAndMessages();
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;

    try {
      const res = await fetch(`/api/message/send/${conversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: messageContent,
          senderId: currentUser._id,
        }),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setMessageContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                  <div
                    className={`flex gap-2 mb-3 ${
                      message.senderId === currentUser._id ? "justify-end" : ""
                    }`}
                  >
                    {message.senderId === currentUser._id ? (
                      <>
                        <div className="bg-primary p-2 rounded-lg max-w-2/3">
                          <p className="text-white">{message.content}</p>
                        </div>
                        <img
                          src={currentUser.profilePicture}
                          alt=""
                          className={`w-8 h-8 rounded-full`}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={user.profilePicture}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="bg-white p-2 rounded-lg max-w-2/3">
                          <p className="text-primary">{message.content}</p>
                        </div>
                      </>
                    )}
                  </div>
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
          <form className="flex gap-3" onSubmit={handleSendMessage}>
            <textarea
              rows={1}
              type="text"
              name="content"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="border border-primary outline-none text-primary p-2 rounded-full w-full resize-none"
              placeholder="Type a message"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-5 rounded-md hover:bg-white hover:text-primary border border-primary"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
