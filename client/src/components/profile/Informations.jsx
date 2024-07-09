import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Followers from "./Followers";
import Following from "./Following";

export default function Informations({ userId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const isCurrentUser = currentUser?._id === userId;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, [userId]);

  const handleFollow = async (id) => {
    try {
      const res = await fetch(`/api/user/follow/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowFollowers = () => {
    setShowFollowers(true);
  };

  const handleShowFollowing = () => {
    setShowFollowing(true);
  };

  return (
    <>
      <div className="cover h-52 bg-white rounded-lg"></div>
      <div className="flex gap-2 items-center">
        <div className="avatar ">
          <div className="-mt-4 flex flex-col justify-center">
            <img
              src={user.profilePicture}
              alt=""
              className="w-28 lg:w-14 h-28 lg:h-14 object-cover rounded-full bg-white border border-secondary"
            />
          </div>
        </div>
        <div className=" flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            <div
              className="flex gap-1 justify-center"
              onClick={handleShowFollowers}
            >
              <p className="text-primary font-bold text-center">
                {user.followers?.length}{" "}
                {user.followers?.length > 1 ? "Followers" : "Follower"}
              </p>
            </div>
            <div
              className="flex gap-1 justify-center"
              onClick={handleShowFollowing}
            >
              <p className="text-primary font-bold text-center">
                {user.following?.length} Following
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-2">
        <p className=" font-bold text-primary">{user.name}</p>
      </div>
      <div className="flex gap-2 mt-4">
        {isCurrentUser ? (
          <button className="border bg-primary text-secondary px-2 py-1 hover:bg-transparent hover:text-primary border-primary rounded-lg">
            Edit Profile
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                handleFollow(user._id);
              }}
              className="border bg-primary text-secondary px-2 py-1 hover:bg-transparent hover:text-primary border-primary rounded-lg"
            >
              {user.followers?.includes(currentUser?._id)
                ? "Unfollow"
                : "Follow"}
            </button>
            <Link
              to={`/message/${user._id}`}
              className="border bg-primary text-secondary px-2 py-1 hover:bg-transparent hover:text-primary border-primary rounded-lg"
            >
              Message
            </Link>
          </>
        )}
      </div>
      <Followers
        showFollowers={showFollowers}
        setShowFollowers={setShowFollowers}
        followers={user.followers}
      />
      <Following
        showFollowing={showFollowing}
        setShowFollowing={setShowFollowing}
        following={user.following}
      />
    </>
  );
}
