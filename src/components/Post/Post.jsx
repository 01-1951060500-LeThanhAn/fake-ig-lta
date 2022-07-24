import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
import { formatRelative } from "date-fns/esm";
import Comment from "../Comments/Comment";

import { toast } from "react-toastify";
import { useUserAuth } from "../../AuthContext/userAuthContext";

import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addPostPlayList } from "../../storeActions";

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

const Post = ({ data, posts, setPosts }) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [savedPost, setSavedPost] = useState([]);

  const handleLike = () => {
    const docRef = doc(db, `posts/${data.id}`);

    if (data.likes?.some((p) => p === user.uid)) {
      const unLike = data.likes.filter((p) => p !== user.uid);
      setDoc(docRef, {
        ...data,
        likes: unLike,
      });

      const unLikPost = posts.map((p) => {
        if (p.id === data.id) return { ...data, likes: unLike };
        return p;
      });

      return setPosts(unLikPost);
    }

    setDoc(docRef, {
      ...data,
      likes: [...data.likes, user.uid],
    });

    const likePostNew = posts.map((p) => {
      if (p.id === data.id)
        return { ...data, likes: [...data.likes, user.uid] };

      return p;
    });

    return setPosts(likePostNew);
  };

  const deletePost = async (idPost) => {
    const Ref = doc(db, "posts", data.id);
    if (data.userId === user.uid) {
      try {
        await deleteDoc(Ref);
        const newListPost = posts.filter((post) => post.id !== idPost);
        setPosts(newListPost);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
      setLoading(false);
      return toast.success("Delete this post successfully");
    } else {
      return toast.error("Delete post failed");
    }
  };

  const handleSavePost = async () => {
    
    if (savedPost) {
      const postSaved = savedPost.some((item) => item.post.id === data.id);
      if (postSaved) {
        return toast.error("Post already exist");
      }
    }

    setLoading(true);
    const newSavedPost = await addPostPlayList(user.uid, data);
    setSavedPost([...savedPost, newSavedPost]);
    setLoading(false);
    toast.success("Save post success");
  };

  return (
    <>
      {!loading && (
        <div className="post__container">
          {/* Header -> Username + Avatar + Local */}
          <div className="post__header">
            <div className="post__header--block-left">
              <div className="post__header--avatar">
                <Avatar alt="Remy Sharp" src={data.avatar} />
              </div>
            </div>
            <div className="post__header--block-right">
              <div className="post__header--username">
                <a href="/#">{data.userName}</a>
                <p>{formatDate(data?.createAt?.seconds)}</p>
              </div>

              {user.uid === data.userId ? (
                <div
                  onClick={() => deletePost(data.id)}
                  className="post__header--more-option"
                >
                  <span>
                    <i className="bx bx-trash"></i>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          {/* image */}
          <div className="post__image">
            <img src={data.imageURL} alt="p-1" />
          </div>
          <div className="post__group-bottom">
            {/* Group of interactive icons */}
            <div className="post__group-bottom">
              <div className="icons">
                <div className="icons-left">
                  <span>
                    <i
                      onClick={handleLike}
                      style={
                        data?.likes && data?.likes.some((p) => p === user.uid)
                          ? { color: "#F82C55" }
                          : { color: "black" }
                      }
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
                <div className="icons-right" onClick={handleSavePost}>
                  <span>
                    <i className="bx bx-bookmark"></i>
                  </span>
                </div>
              </div>
              <div className="post__interactive-info">
                <a href="/#">
                  <span>{data.likes.length}</span> lượt thích
                </a>
              </div>
            </div>
            {/* Username + Caption */}
            <div className="post__caption">
              <div className="post__caption--user">
                <span className="user-name">
                  <a href="/#">{data.userName}</a>
                </span>
                &nbsp;
                <span className="caption">{data.caption}</span>
              </div>

              <p className="post__caption--time">
                {formatDate(data?.createAt?.seconds)}
              </p>
            </div>
            {/* Comments */}

            <Comment id={data.id} data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
