import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
        <Link to="/sign-up" className="avatar-togle flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            alt=""
            className="w-10 h-10 rounded-full bg-secondary border-primary"
          />
          <span className="text-primary font-semibold">John Doe</span>
        </Link>
      </div>
    </div>
  );
}
