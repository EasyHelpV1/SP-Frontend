/* jshint esversion: 8 */
import React from "react";
import "./Post.css";

const Post = ({ id, title, content, createdBy, CreatedAt }) => {
  return (
    <div className="post">
      <div className="post-text" id={id}>
        <div className="post-headings">
          <h3 className="heading-left">{title}</h3>
          <h3 className="heading-right">Posted by: {createdBy}</h3>
        </div>

        <p className="u-text-small">{content}</p>
        <p className="timing">Posted at: {CreatedAt}</p>
      </div>
    </div>
  );
};

export default Post;
