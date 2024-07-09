import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Notifications from "./components/Notifications";
import Conversations from "./components/Conversations";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Post from "./pages/Post";
import { useSelector } from "react-redux";

function MainApp() {
  const location = useLocation();
  const isAuth =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";
  const { currentUser } = useSelector((state) => state.user);
  if (location.pathname.startsWith("/message/")) {
    localStorage.setItem(
      "userIdForConversation",
      location.pathname.split("/")[2]
    );
  } else {
    localStorage.removeItem("userIdForConversation");
  }

  useEffect(() => {}, [location.pathname]);

  return (
    <div className="">
      {isAuth ? (
        <div className="flex justify-center items-center">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      ) : (
        <>
          <div className="px-4 bg-secondary">
            <Header />
          </div>
          <div className="flex px-4">
            <div className="md:w-3/12 pr-2 hidden md:block h-screen-header overflow-y-auto">
              {currentUser && <Conversations />}
            </div>
            <div className="md:w-6/12 w-full mx-2 bg-secondary rounded-md h-screen-header overflow-y-auto">
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/message/:userId" element={<Message />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/post/:postId" element={<Post />} />
                </Route>
              </Routes>
            </div>
            <div className="md:w-3/12 pr-2 hidden md:block h-screen-header overflow-y-auto">
              {currentUser && <Notifications />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
