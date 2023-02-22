import { React, useEffect, useState } from "react";
import { imagefrombuffer } from "imagefrombuffer";

const ImgReady = (userImg) => {
  // console.log(userImg);

  const [userImage, setUserImage] = useState([]);
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
      .then((json) => setUserImage(json));
  };

  useEffect(() => {
    console.log(userImg.userImg);
    getData(userImg.userImg);
    // console.log(userImage);
  }, []);

  return (
    <div className="image">
      {/* {console.log(userImage.img.data)} */}
      {userImage.img ? (
        <img
          src={imagefrombuffer({
            type: userImage.img.type,
            data: userImage.img.data,
          })}
        ></img>
      ) : null}
      {/* <img
        src={imagefrombuffer({
          type: userImage.img.type,
          data: userImage.img.data,
        })}
      ></img> */}
    </div>
  );
};

export default ImgReady;
