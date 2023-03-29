/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [money, setMoney] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState(false);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const post = { title, date, location, money, time, urgency, content };
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
            className="formLabel"
            required
          />
          {/* <label htmlFor="date" style={font-size: 1.6rem;
    margin: 0.7rem;}>
            When do you need this help? */}
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
            // placeholder="Enter date"
            className="formLabel"
            required
          />
          {/* </label> */}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            placeholder="Location"
            className="formLabel"
            required
          />
          {/* <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="text"
            id="time"
            placeholder="Aproximate time needed"
            className="formLabel"
            required
          /> */}
          <label htmlFor="time" className="formLabel">
            Time neccessary
            <select
              value={time}
              id="time"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="Choose One">Choose One</option>
              <option value="1 hour">1 hour</option>
              <option value="Less than an hour">Less than an hour</option>
              <option value="Few hours">Few hours</option>
              <option value="Reccurring">Reccurring</option>
            </select>
          </label>
          <label htmlFor="money" className="formLabel">
            Is this a paid or unpaid task?
            <select
              value={money}
              id="money"
              onChange={(e) => setMoney(e.target.value)}
            >
              <option value="Choose One">Choose One</option>
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
