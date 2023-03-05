/* jshint esversion: 8 */
import { React, useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";
import { useNavigate } from "react-router-dom";

const ImgReady = ({ userImg }) => {
  const [userImage, setUserImage] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      try {
        const response = await fetch(
          `https://sp-backend-b70z.onrender.com/api/v1/imgs/${userImg}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let imgData = await response.json();
        setUserImage(imgData);
        console.log(imgData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="image">
      {userImage &&
        (console.log(userImage),
        (
          <img
            src={imagefrombuffer({
              type: userImage.img.type,
              data: userImage.img.data,
            })}
          ></img>
        ))}
    </div>
  );
};

export default ImgReady;
