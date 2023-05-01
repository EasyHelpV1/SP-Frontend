/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const DeletePost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [postTitle, setPostTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [content, setContent] = useState("");
  // const [timeStamp, setTimeStamp] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const postInfo = { postTitle, createdBy, content };
    try {
      const response = await fetch(`${globalVars.PORT}/admin/DeletePost`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(postInfo),
      });
      let result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }
      setSuccess("Post Deleted");
      setError(null);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container DeletePost">
      <h2>Delete Post</h2>
      <form onSubmit={handleDelete}>
        <div className="form-control">
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            type="postTitle"
            name="postTitle"
            id="postTitle"
            placeholder="Post Title"
            required
          />
          <input
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            type="createdBy"
            name="createdBy"
            id="createdBy"
            placeholder="Email of user who created it"
            required
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="content"
            name="content"
            id="content"
            placeholder="Post Content"
            required
          />
          <button className="submit-btn">Delete Post</button>

          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default DeletePost;
