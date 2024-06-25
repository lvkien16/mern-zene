import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="flex items-center justify-between py-3 mb-4">
      <div className="logo">ZENE</div>
      <div className="search flex gap-2">
        <input
          type="text"
          name="content"
          className="border outline-none border-primary rounded-md p-2 w-96 text-primary bg-secondary"
          placeholder="Search..."
        />
        <button className="border-2 border-primary hover:bg-transparent hover:text-primary px-3 rounded bg-primary text-secondary">
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
              <span className="font-semibold">{currentUser.name}</span>
            </Dropdown.Header>
            <Dropdown.Item className="hover:bg-primary hover:text-secondary">
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="hover:bg-primary hover:text-secondary">
              <button type="button">Sign out</button>
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
