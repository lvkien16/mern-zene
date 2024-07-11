import { Link } from "react-router-dom";

export default function User({ user, refreshPage }) {
  const handleFollow = async () => {
    try {
      const res = await fetch(`/api/user/follow/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await res.json();
      refreshPage();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" border border-primary rounded-md">
      <div className="bg-white rounded-md">
        <Link to={`/profile/${user._id}`} as={"div"}>
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-full h-52 rounded-md"
          />
        </Link>
      </div>
      <p className="text-primary mt-2 font-semibold text-center">{user.name}</p>
      <div className="flex justify-between items-center mt-2 p-2 gap-2">
        <p className="text-primary text-center font-semibold">
          {user.followers && user.followers.length > 0
            ? user.followers.length
            : 0}{" "}
          {user.followers && user.followers.length > 1
            ? "Followers"
            : "Follower"}
        </p>
        <button
          type="button"
          onClick={handleFollow}
          className="px-5 py-2 bg-primary text-white hover:bg-transparent hover:text-primary border border-primary"
        >
          Follow
        </button>
      </div>
    </div>
  );
}
