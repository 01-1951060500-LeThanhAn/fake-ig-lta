import React, { useState, useEffect } from "react";
import { fetchComments, postComment } from "../../storeActions";

import { Timestamp } from "firebase/firestore";

import { useUserAuth } from "../../AuthContext/userAuthContext";

import CommentItem from "./CommentItem";

const Comment = ({ id }) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = async (e) => {
    if(!user) {
      return;
    }
    if(newComment.trim === 0) {
      setLoading(true)
    }
    e.preventDefault();
    const res = await postComment({
      id: id,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      comment: newComment,
      createAt: Timestamp.now(),
     
    });
    
    setComments([...comments, res]);
   setLoading(false)
    setNewComment("");
  };

  useEffect(() => {
    async function getComment() {
      const data = await fetchComments(id);
      setComments(data);
    }

    getComment();
  }, [id]);

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentItem
          user={user}
            data={comments}
            id={comment.id}
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        ))}

      {/* input field for comment */}
      <div className="post__comment">
        <form onSubmit={handlePostComment}>
          <span>
            <i className="bx bx-smile"></i>
          </span>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Thêm bình luận..."
          />
          <button className="btn btn-post-comment">Đăng</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
