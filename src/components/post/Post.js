/* jshint esversion: 8 */
import React, { useState } from "react";
import { MdInsertComment } from "react-icons/md";
import { MdAddComment } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";
import ImgReady from "../images/ImgReady";
import Comment from "./Comment";
import globalVars from "../../globalVars";
// import "./Post.css";

const Post = ({
  postId,
  title,
  date,
  location,
  money,
  time,
  urgency,
  content,
  comments,
  createdById,
  createdBy,
  userPhoto,
  CreatedAt,
}) => {
  // states
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [addComment, setAddComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userImage, setUserImage] = useState();
  const handleViewComments = () => {
    setShowComments(!showComments);
  };
  const handleShowAddComment = () => {
    setShowAddComment(!showAddComment);
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${globalVars.PORT}/comment/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ "comment": addComment, "userId": userId }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${result.msg}`);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  return (
    <div className="post">
      <div className="post-text" id={postId}>
        {/* /// */}
        <div className="post-headings">
          <Link to={`/profile/${createdById}`}>
            <ImgReady userImg={userPhoto} imgClass="post-img" />
          </Link>
          {/* <a href="#a">
          </a> */}
          <h3 className="heading-right">{createdBy}</h3>
          <h3 className="heading-left">{title}</h3>
          <p className="timing">{CreatedAt}</p>
        </div>
        {/* /// */}
        <div className="inside-post">
          <p className="u-text-small">
            {urgency && (
              <span className="urgent-dot">
                <GoPrimitiveDot color="red" size={30} />
              </span>
            )}
            {content}
          </p>
          <div className="post-properties">
            <p className="date">When? {date}</p>
            <p className="location">Where? {location}</p>
            <p className="time">Estimated time needed: {time}</p>
            <p className="money">This request is {money}</p>
            {/* {urgency && <p className="urgency">Urgent</p>} */}
          </div>
        </div>
        {/* /// */}
        <div className="comment-options">
          <p className="commentPShow" onClick={handleViewComments}>
            <MdInsertComment color="black" size={20} />
          </p>
          <p
            className="commentPShow"
            id="add-comment"
            onClick={handleShowAddComment}
          >
            <MdAddComment color="black" size={20} />
          </p>
        </div>
        {/* /// */}
        {showAddComment && (
          <form onSubmit={handleAddComment}>
            <input
              id="addComment"
              type="text"
              placeholder="Add a comment"
              value={addComment}
              onChange={(e) => {
                setAddComment(e.target.value);
              }}
            />
            <button>Add Comment</button>
            {!loading && error && <div className="error-msg">{error}</div>}
          </form>
        )}
        {/* /// */}
        {showComments && (
          <div className="comments-section">
            {comments.length !== 0 ? (
              comments.map((comment) => (
                <Comment key={comment} comment={comment} />
              ))
            ) : (
              <p className="commentP">No comments yet</p>
            )}
          </div>
        )}
        {/* /// */}
      </div>
    </div>
  );
};

export default Post;
