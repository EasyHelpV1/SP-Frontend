import { React, useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";
import { useNavigate } from "react-router-dom";

const ImgReady = (userImg) => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async (imgId) => {
    const token = localStorage.getItem("token");

    return await fetch(`http://localhost:5000/api/v1/imgs/${imgId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setUserImage(json))
      .then(setLoading(false));
  };

  useEffect(() => {
    getData(userImg.userImg);
  }, []);

  return (
    <div className="image">
      {userImage.img ? (
        <img
          src={imagefrombuffer({
            type: userImage.img.type,
            data: userImage.img.data,
          })}
        ></img>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImgReady;
