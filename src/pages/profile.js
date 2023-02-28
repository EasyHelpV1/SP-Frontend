/* jshint esversion: 8 */
import React, { useEffect, useState } from "react";
import "./profile.css";
import Img from "../components/images/Img";
import ImgReady from "../components/images/ImgReady";
import UserInfo from "../components/userInfo/UserInfo";
import PasswordChange from "../components/userInfo/PasswordChange";

const Profile = () => {
  //
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [uImg, setUImg] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    //
    //fetch user data
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let userData = await response.json();
        setUser(userData);
        setUImg(userData.userImg);
        setError(null);
      } catch (err) {
        setError(err.message);
        // setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // console.log({ userId });

  const handleDeletePhoto = async (e) => {
    e.preventDefault();
    // first delete image from db
    const deleteReq = await fetch(`http://localhost:5000/api/v1/imgs/${uImg}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    //edit user image field
    user.userImg = null;
    const updateUser = await fetch(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    )
      .then(() => setUImg(null))
      .then(() => console.log("Delete successful"));
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setUImg(null);
  };

  return (
    <div className="bg">
      <div className="container profile">
        <div className="profile-divs">
          <div className="profile-left">
            <div className="photo">
              {uImg ? (
                <ImgReady userImg={uImg} />
              ) : (
                <div>
                  <h2>Upload a Profile Picture</h2>
                  <Img />
                </div>
              )}
            </div>
            <div className="photo-options">
              {uImg ? (
                <div>
                  <button onClick={handleDeletePhoto}>Delete Photo</button>
                  <button onClick={handleChangePhoto}>Change Photo</button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="profile-right">
            {/* User info and editing */}
            {/* {console.log(user)} */}
            <UserInfo user={user} />
            {/* password change */}
            <PasswordChange user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
