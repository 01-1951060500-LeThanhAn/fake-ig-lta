import React from "react";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import "./Personal.css"
const Personal = () => {
  const { user } = useUserAuth();

  return (
    <>
      <div className="profile__admin">
        <div className="profile__item">
          <div className="profile__displayname">
            <img src={user?.photoURL} alt="" />
          </div>
          <div className="profile__title">
            <p>{user?.displayName}</p>
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Personal;
