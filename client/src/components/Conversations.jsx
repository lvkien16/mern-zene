import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getCoversations = async () => {
      try {
        const res = await fetch(
          `/api/conversation/getconversations/${currentUser._id}`
        );
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCoversations();
  }, [currentUser._id]);
  return (
    <div className=" bg-secondary rounded-lg px-2">
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
          <div className="conversation flex items-center gap-2 p-2 border-b border-primary bg-primary rounded-lg">
            <img
              src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="text-secondary font-semibold">John Doe</h4>
              <p className="text-secondary">Hello, how are you?</p>
            </div>
          </div>
        ) : (
          <p className="text-primary text-center">No Conversations</p>
        )}
      </div>
    </div>
  );
}
