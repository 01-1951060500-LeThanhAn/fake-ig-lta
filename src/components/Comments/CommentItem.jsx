import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";
import { formatRelative } from "date-fns/esm";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./CommentItem.css"
import { db } from "../../firebase/firebase";
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

const CommentItem = ({ comment, id, user }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    const Ref = doc(db, "comments", comment.id);
    if (comment.userId === user.uid) {
      try {
        await deleteDoc(Ref);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
      return toast.success("Delete this comment successfully");
    } else {
      return toast.error("Delete comment failed")
    }
  };

  return (
    <>
      {!loading && (
        <div className="comments">
          <img src={user ? comment?.avatar : avatar} alt="" />
          <div
            style={{
              display: "flex",
              lineHeight: "3px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "14px",
                  margin: "0 7px",
                }}
              >
                {comment.userName}
              </span>
              <p>{comment?.comment}</p>
              <p
                className="post__caption--time"
                style={{ marginLeft: "12px", fontSize: "13px" }}
              >
                {formatDate(comment?.createAt?.seconds)}
              </p>
            </div>

            <div className="comment-action" style={{ marginLeft: "10px" }}>
              <div
                onClick={() => handleDeleteComment(id)}
                className="comment-remove"
              >
                <p
                  style={{ fontSize: "13px", color: "#333", cursor: "pointer" }}
                >
                  Xóa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
