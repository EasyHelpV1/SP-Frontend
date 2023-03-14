/* jshint esversion: 8 */
import { React, useState, useEffect } from "react";
import $ from "jquery";
import { imagefrombuffer } from "imagefrombuffer";
import Comment from "./Comment";
import globalVars from "../../globalVars";
import { MdInsertComment } from "react-icons/md";
import { MdAddComment } from "react-icons/md";
import "./Post.css";

const Post = ({
  postId,
  title,
  content,
  comments,
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

  const [userImage, setUserImage] = useState();

  const handleViewComments = () => {
    setShowComments(!showComments);
  };
  const handleShowAddComment = () => {
    setShowAddComment(!showAddComment);
  };
  useEffect(() => {
    const getPhotoData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${globalVars.PORT}/imgs/${userPhoto}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        let result = await response.json();
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${result}`);
        }
        setUserImage(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPhotoData();
  }, []);
  // console.log(userImage);

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
      // $(`#${postId}.comments-section`).load(`#${postId}.comments-section`);
      // setShowComments(!showComments);
    }
  };

  return (
    <div className="post">
      <div className="post-text" id={postId}>
        <div className="post-headings">
          {userImage && (
            // console.log(userImage.img),
            <div className="image">
              <a href="#">
                <img
                  className="post-img"
                  src={imagefrombuffer({
                    type: userImage.img.type,
                    data: userImage.img.data,
                  })}
                ></img>
              </a>
            </div>
          )}
          <h3 className="heading-left">{title}</h3>
          <h3 className="heading-right">{createdBy}</h3>
        </div>

        <p className="timing">{CreatedAt}</p>
        <p className="u-text-small">{content}</p>
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
            {error && <div className="error-msg">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Post;
