import { useEffect, useState } from "react";
import User from "./User";

export default function SuggestUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const res = await fetch("/api/home/suggestusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setSuggestedUsers(data);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };
    getSuggestedUsers();
  }, [refresh]);

  return (
    <div>
      {suggestedUsers && suggestedUsers.length > 0 ? (
        <div className="mt-5 flex gap-2 overflow-auto">
          {suggestedUsers.map((user) => (
            <div key={user._id} className="w-1/3">
              <User user={user} refreshPage={refreshPage} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div className="text-center text-primary font-semibold mt-5">
        Follow for more posts
      </div>
    </div>
  );
}
