/*jshint esversion: 8*/
import React, { useEffect, useState } from "react";
import { MdAddComment } from "react-icons/md";
import moment from "moment";
import ImgReady from "../images/ImgReady";
import globalVars from "../../globalVars";

const Comment = ({ comment }) => {
  const [actualComment, setActualComment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {error && <div className="error-msg">{error}</div>}
        {/* {actualComment[0].userData[0].userImg && ( */}
        <a href="#a">
          <ImgReady
            userImg={
              actualComment[0].userData[0].userImg
                ? actualComment[0].userData[0].userImg
                : "641d1dcd34c9ed492688ecfa"
            }
            imgClass="comment-img"
          />
        </a>
        {/* )} */}
        <div className="comment-details">
          <p className="commentAuthor">
            {actualComment[0].userData[0].firstN}{" "}
            {actualComment[0].userData[0].lastN}
          </p>
          <p className="commentP"> {actualComment[0].content}</p>
          <span className="commentTime">
            {moment(actualComment[0].createdAt).utc().format("YYYY-MM-DD")}
          </span>
          <span className="commentReply">
            <MdAddComment color="black" size={20} />
          </span>
        </div>
      </div>
    );
  } else {
    return <p className="commentP">loading...</p>;
  }
};

export default Comment;
