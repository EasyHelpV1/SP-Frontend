/*jshint esversion: 8*/
import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ImgReady from "../images/ImgReady";
import globalVars from "../../globalVars";
import "./Reply.css";

const Reply = ({ reply }) => {
  const [actualReply, setActualReply] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReplyData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${globalVars.PORT}/reply/${reply}`, {
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

        setActualReply(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReplyData();
  }, [reply]);

  if (!loading) {
    return (
      <div className="reply-stuff">
        {error && <div className="error-msg">{error}</div>}
        <Link to={`/profile/${actualReply[0].createdBy}`}>
          <ImgReady
            userImg={
              actualReply[0].userData[0].userImg
                ? actualReply[0].userData[0].userImg
                : `${process.env.DEFAULT_PHOTO}`
            }
            imgClass="reply-img"
          />
        </Link>
        <div className="reply-details">
          <p className="replyAuthor">
            {actualReply[0].userData[0].firstN}{" "}
            {actualReply[0].userData[0].lastN}
          </p>
          <p className="replyP"> {actualReply[0].content}</p>
          <span className="replyTime">
            {moment(actualReply[0].createdAt).utc().format("lll")}
          </span>
        </div>
      </div>
    );
  } else {
    return <p className="replyP">loading...</p>;
  }
};

export default Reply;
