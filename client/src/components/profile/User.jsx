import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User({ follow, setFollow }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${follow}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, [follow]);

  const handleClose = () => {
    setFollow(false);
  };

  return (
    <Link to={`/profile/${user._id}`} onClick={handleClose}>
      <div className="flex items-center gap-2">
        <img
          src={user.profilePicture}
          alt=""
          className="w-10 h-10 object-cover rounded-full bg-white border border-secondary"
        />
        <span>{user.name}</span>
      </div>
    </Link>
  );
}
