import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Account.css";
const Account = ({ data }) => {
  const [follow, setFollow] = useState(false);

  return (
    <>
      <div className="account">
        <div className="account__info">
          <div className="avatar">
            <Avatar src={data?.avatar} />
          </div>
          <div className="nickname">
            <h4>
              {data.nickname}
              <CheckCircleIcon
                style={{
                  fontSize: "14px",
                  marginLeft: "6px",
                  color: "rgb(29, 166, 247)",
                }}
              />
            </h4>
            <p>{data.userName}</p>
          </div>
        </div>

        <div onClick={() => setFollow(!follow)} className="account__follow">
          {follow ? "Đang Theo dõi" : "Theo dõi"}
        </div>
      </div>
    </>
  );
};

export default Account;
