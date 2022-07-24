import { Box, Button, Input, Tab } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../AuthContext/userAuthContext";
import Header from "../Header/Header";
import { FiSettings } from "react-icons/fi";
import "./Profile.css";
import TabConText from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@material-ui/lab/TabList";
import SavePost from "../Profile/SavePost";
import "react-loading-skeleton/dist/skeleton.css";

const tabStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Profile = () => {
  const { user } = useUserAuth();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__main">
          <div className="profile__avatar">
            <img src={user?.photoURL} alt={user?.displayName} />
          </div>

          <div className="profile__info">
            <div className="profile__first">
              <h2>{user?.email}</h2>
             <div className="profile__edit__box">
                <Button variant="outlined">Edit Profile</Button>
                <div className="profile__edit">
                  <FiSettings />
                </div>
             </div>
            </div>
            <div className="profile__follow">
              <p>
                <span>0</span> bài viết
              </p>
              <p>
                <span>10</span> người theo dõi
              </p>
              <p>
                Đang theo dõi <span>13</span> người dùng
              </p>
            </div>
            <div className="profile__user">
              <h4>{user?.displayName}</h4>
            </div>
          </div>
        </div>
      </div>

      <Box
        style={{ marginTop: "30px" }}
        sx={{ width: "100%", typography: "body1" }}
      >
        <TabConText value={value}>
          <Box
            style={tabStyles}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList onChange={handleChange}>
              <Tab label="Bài viết" value="1" />
              <Tab label="Đã lưu" value="2" />
              <Tab label="Được gắn thẻ" value="3" />
            </TabList>
          </Box>
          <TabPanel style={{ textAlign: "center" }} value="1">
            Item One
          </TabPanel>
          <TabPanel style={{ textAlign: "center" }} value="2">
            <SavePost />
          </TabPanel>
          <TabPanel style={{ textAlign: "center" }} value="3">
            Item Three
          </TabPanel>
        </TabConText>
      </Box>
    </>
  );
};

export default Profile;
