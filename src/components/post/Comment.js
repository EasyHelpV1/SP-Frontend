/*jshint esversion: 8*/
import React, { useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";
import moment from "moment";
import globalVars from "../../globalVars";

const Comment = ({ comment }) => {
  const [actualComment, setActualComment] = useState([]);
  const [userImage, setUserImage] = useState();

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
          throw new Error(`This is an HTTP error: The status is ${result.msg}`);
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

  // console.log(actualComment[0].userData[0].userImg);
  const getPhotoData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${globalVars.PORT}/imgs/${actualComment[0].userData[0].userImg}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
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

  if (!loading) {
    getPhotoData();
    return (
      <div className="comment-stuff">
        {/* {error && <div className="error-msg">{error}</div>} */}
        {userImage && (
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
        <p className="commentP"> {actualComment[0].content}</p>
        <p className="commentAuthor">
          {actualComment[0].userData[0].firstN}{" "}
          {actualComment[0].userData[0].lastN}
        </p>
        <span className="commentTime">
          {moment(actualComment[0].createdAt).utc().format("YYYY-MM-DD")}
        </span>
      </div>
    );
  } else {
    return <p className="commentP">loading...</p>;
  }
};

export default Comment;
