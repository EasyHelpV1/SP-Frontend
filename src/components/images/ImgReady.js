/* jshint esversion: 8 */
import { React, useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";
import globalVars from "../../globalVars";
import loadingImg from "../../assets/loadingImg.gif";

const ImgReady = ({ userImg, imgClass }) => {
  const [userImage, setUserImage] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${globalVars.PORT}/imgs/${userImg}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        let result = await response.json();

        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${result}`);
        }
        setUserImage(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  const readImg = (image) => {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));
    return `data:image/png;base64,${base64String}`;
  };

  if (!loading) {
    return (
      <div className="image">
        {error && <div className="error-msg">{error}</div>}
        <img
          className={imgClass}
          alt="user"
          src={`${readImg(userImage.img.data)}`}
          // src={imagefrombuffer({
          //   type: userImage.img.type,
          //   data: userImage.img.data,
          // })}
        ></img>
      </div>
    );
  } else {
    return (
      <div>
        <img className={imgClass} alt="user" src={loadingImg}></img>
      </div>
    );
    // return <div>Loading...</div>;
  }
};

export default ImgReady;
