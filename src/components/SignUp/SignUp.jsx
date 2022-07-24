import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import Image1 from "../../assets/phone.PNG";
import Logo from "../../assets/logo.png";
import AppStore from "../../assets/appstore.png";
import GgPlay from "../../assets/ggplay.png";

import "./SignUp.css";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { googleSignIn, facebookSignIn, user } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    await googleSignIn();
    navigate("/home");
  };

  const handleFacebook = async () => {
    await facebookSignIn();
    navigate("/home");
    console.log({ user });
  };

  return (
    <>
      <div className="login">
        <div className="login-image">
          <img style={{ width: "100%" }} src={Image1} alt="" />
        </div>
        <div className="login-form">
          <img src={Logo} alt="" />
          <div className="login-form-social">
            <button
              className={`login-form-button login-form-google ${
                loading ? "disableButton" : ""
              }`}
              onClick={handleGoogle}
            >
              <box-icon color="white" type="logo" name="google"></box-icon>{" "}
              <span>Login with Google</span>
            </button>
            <button
              className={`login-form-button login-form-facebook ${
                loading ? "disableButton" : ""
              }`}
              onClick={handleFacebook}
              disabled={loading}
            >
              <box-icon
                color="white"
                type="logo"
                name="facebook-circle"
              ></box-icon>
              <span>Login with Facebook</span>
            </button>
          </div>

          <p>
            Bạn chưa có tài khoản ư?
            <Link style={{ color: "#1295F6" }} to="/login">
              Đăng ký
            </Link>
          </p>

          <div className="download-image">
            <img style={{ width: "150px" }} src={GgPlay} alt="" />
            <img style={{ width: "150px" }} src={AppStore} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
