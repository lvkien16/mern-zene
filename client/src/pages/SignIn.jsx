import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  };
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
          Sign In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />

          {error && <p className="text-red-500">{error}</p>}
          <p className="text-primary">
            Do not have an account?{" "}
            <Link to="/sign-up" className="hover:underline">
              Sign up
            </Link>
          </p>
          <button
            type="submit"
            className="bg-primary text-secondary border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none"
          >
            {loading ? "Loading..." : "Sign In"}
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
