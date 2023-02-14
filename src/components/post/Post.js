import React from "react";
import "./Post.css";

const Post = ({ id, title, content, createdBy }) => {
  return (
    <div className="post">
      <div className="post-text" id={id}>
        <h3>{title}</h3>
        <p className="u-text-small">{content}</p>
        <p className="u-text-small author">Author: {createdBy}</p>
      </div>
    </div>
  );
};

export default Post;
