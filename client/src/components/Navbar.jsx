import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <div className="home w-1/3 flex justify-center items-center py-2 text-secondary bg-primary px-2 rounded-tl-lg gap-1">
        <IoMdHome />
      </div>
      <div className="friend border-x w-1/3 border-primary flex justify-center items-center py-2 text-primary px-2 gap-1">
        <FaUserFriends />
      </div>
      <div className="notifications w-1/3 flex justify-center items-center py-2 text-primary px-2 gap-1">
        <IoMdNotifications />
      </div>
    </div>
  );
}
