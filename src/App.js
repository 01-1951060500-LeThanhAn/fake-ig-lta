import React from "react";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";

import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "./AuthContext/userAuthContext";
import "./App.css";

const App = () => {
  const { theme } = useUserAuth();
  return (
    <>
      <ToastContainer />
      <div className={theme}>
     
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route path="/home" element={<Home />} />

              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
     
      </div>
    </>
  );
};

export default App;
