import { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function SendMessage({ userId, messages, setMessages }) {
  const [messageContent, setMessageContent] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/message/send/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          text: messageContent,
          images: [],
          videos: [],
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
  );
}
