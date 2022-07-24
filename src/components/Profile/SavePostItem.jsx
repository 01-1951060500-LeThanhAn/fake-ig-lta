import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import Comment from "../Comments/Comment";
import { formatRelative } from "date-fns/esm";
import "./SavePostItem.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useUserAuth } from "../../AuthContext/userAuthContext";
const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(new Date(date * 1000), new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};
const SavePostItem = ({
  avatar,
  imageURL,
  caption,
  userName,
  id,
  data,
  savedPosts,
  setSavedPosts,
}) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const handleDeletePostSaved = async (idPost) => {
    try {
      const savePostRef = doc(db, "favouritePost", idPost.id);
      await deleteDoc(savePostRef);
      const newListPost = savedPosts.filter((post) => post.id !== idPost.id);
      setSavedPosts(newListPost);
      setLoading(true);
    } catch (error) {
      return toast.error(error.message);
    }

    setLoading(false);
    return toast.success("Delete this post successfully");
  };

  return (
    <>
      {!loading && (
        <div className="saved__post">
          <div className="saved__post__item">
            <div className="post__header">
              <div className="post__header--block-left">
                <div className="post__header--avatar">
                  <Avatar alt="Remy Sharp" src={avatar} />
                </div>
              </div>
              <div className="post__header--block-right">
                <div className="post__header--username">
                  <a href="/#">{userName}</a>
                  <p>{formatDate(data?.createAt?.seconds)}</p>
                </div>

                <div className="post__header--more-option">
                  <span onClick={() => handleDeletePostSaved(data)}>
                    <i className="bx bx-trash"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="post__image">
              <img src={imageURL} alt="p-1" />
            </div>
            <div className="post__group-bottom">
              {/* Group of interactive icons */}
              <div className="post__group-bottom">
                <div className="icons">
                  <div className="icons-left">
                    <span>
                      <i
                        // onClick={handleLike}
                        // style={
                        //   data?.likes && data?.likes.some((p) => p === user.uid)
                        //     ? { color: "#F82C55" }
                        //     : { color: "black" }
                        // }
                        className="bx bxs-heart bx-border"
                      ></i>
                    </span>

                    <span>
                      <i className="bx bx-message-rounded"></i>
                    </span>
                    <span>
                      <i className="bx bx-paper-plane"></i>
                    </span>
                  </div>
                  <div className="icons-right">
                    <span>
                      <i className="bx bx-bookmark"></i>
                    </span>
                  </div>
                </div>
                <div className="post__interactive-info">
                  <a href="/#">
                    <span>0</span> lượt thích
                  </a>
                </div>
              </div>
              {/* Username + Caption */}
              <div className="post__caption">
                <div className="post__caption--user">
                  <span className="user-name">
                    <a href="/#">{userName}</a>
                  </span>
                  &nbsp;
                  <span className="caption">{caption}</span>
                </div>

                <p className="post__caption--time">
                  {formatDate(data?.createAt?.seconds)}
                </p>
              </div>
              {/* Comments */}

              <Comment id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavePostItem;
