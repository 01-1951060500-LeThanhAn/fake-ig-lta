import React, { useState } from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import Logo from "../../assets/ig.PNG";
import Menu from "../Menu/Menu";

const Header = ({ handleClickAddNewPost }) => {
  const { user } = useUserAuth();

  const [addNew, setAddNew] = useState(false);
  const transferMessageAddNewPost = (addNew) => {
    setAddNew(true);
    handleClickAddNewPost(addNew);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header__left">
          <div className="header__logo">
            <Link to="/home">
              <img src={Logo} alt="" />
            </Link>
          </div>

          <div className="header__title">
            <p>FakeIg App</p>
          </div>
        </div>

        <div className="header__search">
          <input type="text" placeholder="Tìm kiếm" />
          <i className="bx bx-search-alt-2"></i>
        </div>
        <div className="header__login">
          {user ? (
            <div className="right">
              <button
                className="btn btn-upload"
                onClick={transferMessageAddNewPost}
              >
                <i className="bx bx-message-square-add"></i>
              </button>

              <Menu>
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  src={user.photoURL}
                  alt=""
                />
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="btn btn-sign-up">Sign up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
