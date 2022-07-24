import React from "react";
import { Link } from "react-router-dom";

const MeunItem = ({ menu }) => {
  return (
    <>
      <Link to={menu.to}>
        <div className="menu__item">
          <div className="menu__icon">{menu.icon}</div>
          <div className="menu__title">{menu.title}</div>
        </div>
      </Link>
    </>
  );
};

export default MeunItem;
