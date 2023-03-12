/* jshint esversion: 8 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalVars from "../../globalVars";

const CreatePost = () => {
  const navigate = useNavigate();
  // const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const post = { title, content };

    const token = localStorage.getItem("token");

    console.log(`got token ${token}`);

    fetch(`${globalVars.PORT}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(window.location.reload(false));
    navigate("/allPosts", { replace: true });
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
    </div>
  );
};

export default CreatePost;
