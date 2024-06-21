import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="h-screen w-full gap-10 flex justify-center items-center container px-4">
      <div className="w-1/2">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Welcome to ZENE
        </h1>
        <p className="text-primary text-center">
          The best social media platform to connect with friends and family
        </p>
      </div>
      <div className="bg-secondary py-10 px-20 w-1/2 rounded-xl">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <p className="text-primary">
            Have an account?{" "}
            <Link to="/sign-in" className="hover:underline">
              Sign in
            </Link>
          </p>
          <button
            type="submit"
            className="bg-primary text-secondary border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="flex justify-center items-center gap-2 bg-primary text-secondary border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
          >
            <FaGoogle /> Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
