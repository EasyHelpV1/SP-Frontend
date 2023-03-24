/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const post = { title, content };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${globalVars.PORT}/posts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });
      let result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }
      window.location.reload(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container createPost">
      <h2>Create a post</h2>
      <form onSubmit={handleRegister}>
        <div className="form-control">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Post Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            id="content"
            placeholder="Post Content"
            required
          />

          <button className="create-btn">Create Post</button>
        </div>
      </form>
      {!loading && error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default CreatePost;
