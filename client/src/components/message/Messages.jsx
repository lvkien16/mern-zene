import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { IoMdMore } from "react-icons/io";

export default function Messages({ message, user, setMessages }) {
  const { currentUser } = useSelector((state) => state.user);
  const [showCreatedAt, setShowCreatedAt] = useState(false);

  const handleShowCreatedAt = () => {
    setShowCreatedAt(!showCreatedAt);
  };

  const handleUnsendMessageForOne = async (id) => {
    try {
      const res = await fetch(`/api/message/unsendforone/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!res.ok) {
        return;
      }
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsendMessageForEveryone = async (id) => {
    try {
      const res = await fetch(`/api/message/unsendforeveryone/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!res.ok) {
        return;
      }
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex gap-2 mb-3 ${
        message.sender === currentUser._id ? "justify-end" : ""
      }`}
    >
      {message.sender === currentUser._id ? (
        <>
          <div className="max-w-2/3">
            <div className="flex gap-2">
              <Dropdown
                label={<IoMdMore className="text-xl text-primary" />}
                inline
                arrowIcon={false}
                className="bg-secondary border-white"
              >
                <Dropdown.Item
                  onClick={() => handleUnsendMessageForOne(message._id)}
                  className="hover:!bg-primary text-primary hover:text-white"
                >
                  Unsend for you
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleUnsendMessageForEveryone(message._id)}
                  className="hover:!bg-primary text-primary hover:text-white"
                >
                  Unsend for everyone
                </Dropdown.Item>
              </Dropdown>
              <div
                className="bg-primary p-2 rounded-lg w-full cursor-default"
                onClick={handleShowCreatedAt}
              >
                <p className="text-white break-all">{message.text}</p>
              </div>
            </div>
            {showCreatedAt && (
              <p className="text-sm w-full text-center text-primary">
                {moment(message.createdAt).format("DD-MM HH:mm")}
              </p>
            )}
          </div>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        </>
      ) : (
        <>
          <img
            src={user.profilePicture}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div className="max-w-2/3">
            <div className="flex gap-2">
              <div
                className="bg-white p-2 rounded-lg w-full cursor-default"
                onClick={handleShowCreatedAt}
              >
                <p className="text-primary break-all">{message.text}</p>
              </div>
              <Dropdown
                label={<IoMdMore className="text-xl text-primary" />}
                inline
                arrowIcon={false}
                className="bg-secondary border-white"
              >
                <Dropdown.Item
                  onClick={() => handleUnsendMessageForOne(message._id)}
                  className="hover:!bg-white text-primary hover:text-primary"
                >
                  Delete
                </Dropdown.Item>
              </Dropdown>
            </div>
            {showCreatedAt && (
              <p className="text-sm text-center text-primary">
                {moment(message.createdAt).format("DD-MM HH:mm")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
