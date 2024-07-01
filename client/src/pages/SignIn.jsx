import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        localStorage.setItem("access_token", data.access_token);
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="h-screen w-full gap-10 flex justify-center items-center container px-4">
      <div className="md:w-1/2 hidden md:block">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Welcome to ZENE
        </h1>
        <p className="text-primary text-center">
          The best social media platform to connect with friends and family
        </p>
      </div>
      <div className="bg-secondary py-10 w-full px-20 md:w-1/2 rounded-xl">
        <h1 className="text-4xl text-primary font-semibold text-center mb-4">
          Sign In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            onChange={handleChange}
            type="email"
            autoComplete="current-email"
            name="email"
            placeholder="Email"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />
          <input
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            name="password"
            placeholder="Password"
            className="border outline-none border-primary rounded-md p-2 text-primary bg-secondary"
          />

          {error && <p className="text-red-500">{error}</p>}
          <p className="text-primary">
            Don{`'`}t have an account?{" "}
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
          <OAuth />
        </form>
      </div>
    </div>
  );
}
