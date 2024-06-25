import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Followers from "./components/Followers";
import Conversations from "./components/Conversations";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";

function MainApp() {
  const location = useLocation();
  const isAuth =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

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
            <div className="w-3/12 pr-2">
              <Conversations />
            </div>
            <div className="w-6/12 mx-2 bg-secondary rounded-lg">
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/message" element={<Message />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </div>
            <div className="w-3/12 pl-2">
              <Followers />
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
