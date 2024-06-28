import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between py-3 mb-4">
      <Link to="/" className="logo">
        ZENE
      </Link>
      <div className="search flex gap-2">
        <input
          type="text"
          name="content"
          className="border outline-none border-primary rounded-md p-2 w-96 text-primary bg-secondary"
          placeholder="Search..."
        />
        <button className="border border-primary hover:bg-transparent hover:text-primary px-3 rounded bg-primary text-secondary">
          Search
        </button>
      </div>
      <div className="flex gap-10 items-center">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex gap-2 items-center">
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
                <span className="font-semibold text-primary">
                  {currentUser.name}
                </span>
              </div>
            }
            className="bg-secondary text-primary"
          >
            <Dropdown.Header>
              <p className="font-semibold w-full text-center">
                {currentUser.name}
              </p>
            </Dropdown.Header>
            <Dropdown.Item className="p-0">
              <Link
                to={`/profile/${currentUser._id}`}
                as="div"
                className="w-full h-full hover:bg-primary hover:text-secondary py-2"
              >
                Profile
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} className="p-0">
              <p className=" w-full text-center hover:bg-primary hover:text-secondary py-2">
                Sign out
              </p>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in" className="text-primary font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
