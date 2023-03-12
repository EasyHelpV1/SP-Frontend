/*jshint esversion: 8*/
import React, { useEffect, useState } from "react";
import moment from "moment";
import globalVars from "../../globalVars";

const Comment = ({ comment }) => {
  const [actualComment, setActualComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getCommentData = async () => {
      try {
        const response = await fetch(`${globalVars.PORT}/comment/${comment}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let commentData = await response.json();
        setActualComment(commentData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCommentData();
  }, []);
  if (!loading) {
    return (
      <div className="comment-stuff">
        <p className="commentAuthor">
          {actualComment[0].userData[0].firstN}{" "}
          {actualComment[0].userData[0].lastN}
        </p>
        <p className="commentP"> {actualComment[0].content}</p>
        <span className="commentTime">
          {moment(actualComment[0].createdAt).utc().format("YYYY-MM-DD")}
        </span>
        {/* add user image as well */}
      </div>
    );
  } else {
    return <p className="commentP">loading...</p>;
  }
};

export default Comment;
