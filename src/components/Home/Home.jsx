import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../../App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "../Header/Header";
import Post from "../Post/Post";
import { db, storage } from "../../firebase/firebase";

import Modal from "@material-ui/core/Modal";
import { Input, Button } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUserAuth } from "../../AuthContext/userAuthContext";

import Follow from "../Follow/Follow";
import Personal from "../Accounts/Personal";
import AccountTrailer from "../Accounts/AccountTrailer";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useUserAuth();
  const [modalStyle] = React.useState(getModalStyle);
  const [loading, setLoading] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleClickAddNewPost = (childData) => {
    setOpenModalUpload(childData);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(true);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //handle Error
        alert(error.message);
      },
      () => {
        //handle when complete

        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await addDoc(collection(db, "posts"), {
            createAt: Timestamp.now(),
            caption: caption,
            avatar: user.photoURL,
            imageURL: url,
            userName: user.displayName,
            id: uuidv4(),
            likes: [],
            userId: user.uid,
          });
          setLoading(false);
          setProgress(0);
          setCaption("");
          setOpenModalUpload(false);
        });
      }
    );
  };

  return (
    <>
      <Header handleClickAddNewPost={handleClickAddNewPost} />
      <div className="container_main">
        <div className="Post__list">
          <div className="fake_account">
            <AccountTrailer />
          </div>

          {posts.map((post, index) => (
            <Post posts={posts} setPosts={setPosts} key={post.id} data={post} />
          ))}
        </div>
        <div className="profile_admin">
          <Personal />
          <Follow />
        </div>
      </div>
      <Modal open={openModalUpload} onClose={() => setOpenModalUpload(false)}>
        <div style={modalStyle} className="form__upload">
          <form className="form__signup">
            <img
              className="form__logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Logo"
            />
            <div className="form__group">
              <progress value={progress} max="100" />
            </div>
            <div className="form__group">
              <Input
                className="form__field"
                placeholder="Enter a caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="form__group">
              <input
                className="form__field"
                type="file"
                onChange={handleChange}
              />
            </div>
            <Button
              style={{
                marginTop: "30px",
                width: "100%",
                padding: "12px",
                cursor: "pointer",
                backgroundColor: "#45aaf2",
                color: "white",
                fontSize: "16px",
                border: "none",
                fontWeight: 600,
              }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Home;
