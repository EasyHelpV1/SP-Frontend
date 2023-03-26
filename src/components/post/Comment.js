/*jshint esversion: 8*/
import React, { useEffect, useState } from "react";
import { MdAddComment } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import ImgReady from "../images/ImgReady";
import Reply from "./Reply";
import globalVars from "../../globalVars";

const Comment = ({ comment }) => {
  const [actualComment, setActualComment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [addReply, setAddReply] = useState("");

  const [showAddReply, setShowAddReply] = useState(false);
  const handleShowAddReply = () => {
    setShowAddReply(!showAddReply);
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${globalVars.PORT}/reply/${comment}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ "reply": addReply, "userId": userId }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }
      setError(null);
      window.location.reload(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCommentData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${globalVars.PORT}/comment/${comment}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        let result = await response.json();

        if (!response.ok) {
          throw new Error(`${result.msg}`);
        }

        setActualComment(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCommentData();
  }, [comment]);

  if (!loading) {
    return (
      <div className="comment-stuff">
        {/* {error && <div className="error-msg">{error}</div>} */}
        {/* {actualComment[0].userData[0].userImg && ( */}
        <Link to={`/profile/${actualComment[0].createdBy}`}>
          <ImgReady
            userImg={
              actualComment[0].userData[0].userImg
                ? actualComment[0].userData[0].userImg
                : `${process.env.DEFAULT_PHOTO}`
            }
            imgClass="comment-img"
          />
        </Link>

        {/* )} */}
        <div className="comment-details">
          <p className="commentAuthor">
            {actualComment[0].userData[0].firstN}{" "}
            {actualComment[0].userData[0].lastN}
          </p>
          <p className="commentP">
            {actualComment[0].content}
            <span className="commentReply" onClick={handleShowAddReply}>
              <MdAddComment color="black" size={20} />
            </span>
          </p>
          <span className="commentTime">
            {moment(actualComment[0].createdAt).utc().format("lll")}
          </span>

          {showAddReply && (
            <form onSubmit={handleAddReply}>
              <input
                id="addReply"
                type="text"
                placeholder="Add a reply"
                value={addReply}
                onChange={(e) => {
                  setAddReply(e.target.value);
                }}
              />
              <button>Add Reply</button>
              {!loading && error && <div className="error-msg">{error}</div>}
            </form>
          )}
          <div className="replies-section">
            {actualComment[0].replies.length !== 0 &&
              actualComment[0].replies.map((reply) => (
                <Reply key={reply} reply={reply} />
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <p className="commentP">loading...</p>;
  }
};

export default Comment;
