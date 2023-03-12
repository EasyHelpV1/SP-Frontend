/* jshint esversion: 8 */
import { React, useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";
import globalVars from "../../globalVars";

const ImgReady = ({ userImg }) => {
  const [userImage, setUserImage] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${globalVars.PORT}/imgs/${userImg}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
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

  if (!loading) {
    return (
      <div className="image">
        <img
          src={imagefrombuffer({
            type: userImage.img.type,
            data: userImage.img.data,
          })}
        ></img>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ImgReady;
