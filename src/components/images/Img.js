import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Img = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  async function handleImg(event) {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    const response = await fetch("http://localhost:5000/api/v1/imgs/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    // navigate("/profile", { replace: true });
    window.location.reload(false);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div>
      {/* <h2>Add Profile Picture</h2> */}
      <form onSubmit={handleImg}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Img;
