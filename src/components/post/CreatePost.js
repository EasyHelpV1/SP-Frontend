/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [money, setMoney] = useState("");
  const [time, setTime] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const post = { title, money, time, urgency, content };
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
      // window.location.reload(false);
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
            className="formLabel"
            required
          />
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="text"
            id="time"
            placeholder="Aproximate time needed"
            className="formLabel"
            required
          />
          <label htmlFor="money" className="formLabel">
            Is this a paid or unpaid task?
            <select
              value={money}
              id="money"
              onChange={(e) => setMoney(e.target.value)}
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </label>
          <label htmlFor="urgency" className="formLabel">
            <input
              // value={urgency}
              onChange={(e) => setUrgency(e.target.checked)}
              type="checkbox"
              id="urgency"
            />
            This is urgent
          </label>
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
