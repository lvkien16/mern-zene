import { useEffect, useState } from "react";

export default function User({ conversation, userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${conversation.receiver}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.receiver]);
  return (
    <div
      to={`/message/${conversation.receiver}`}
      className={`conversation flex items-center gap-2 p-2 border-b border-primary  ${
        userId === conversation.receiver && "bg-primary"
      } ${!userId && userId !== conversation.receiver && ""}`}
    >
      <img
        src={user.profilePicture}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h4
          className={` font-semibold ${
            userId === conversation.receiver ? "text-white" : "text-primary"
          }`}
        >
          {user.name}
        </h4>
        <p
          className={` ${
            userId === conversation.receiver ? "text-white" : "text-primary"
          }`}
        >
          Last content
        </p>
      </div>
    </div>
  );
}
