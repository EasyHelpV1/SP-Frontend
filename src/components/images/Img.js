/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const Img = () => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImg = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      if (!file) {
        throw new Error("No file selected");
      }
      if (file.size > 65000) {
        throw new Error("File is too big!");
      }
      const response = await fetch(`${globalVars.PORT}/imgs/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }

      setError(null);
      window.location.reload(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={handleImg}>
        <input type="file" id="image-input" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {!loading && error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Img;
