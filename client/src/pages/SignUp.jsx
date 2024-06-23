import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please fill in all fields");
    }

    if (
      formData.password !== formData.confirmPassword &&
      formData.password &&
      formData.confirmPassword &&
      formData.name &&
      formData.email &&
      formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.name &&
      formData.email &&
      formData.password.length < 6 &&
      formData.password.length > 0
    ) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return setLoading(false);
      }
      setLoading(false);
      setError("");
      setFormData({});
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again");
      console.log(error);
    }
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
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
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
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          {error && <p className="text-red-500">{error}</p>}
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
      </div>
    </div>
  );
}
