/* jshint esversion: 8 */
import React, { useEffect, useState } from "react";
import "./profile.css";
import Img from "../components/images/Img";
import ImgReady from "../components/images/ImgReady";
import UserInfo from "../components/userInfo/UserInfo";
import PasswordChange from "../components/userInfo/PasswordChange";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import globalVars from "../globalVars";

const Profile = () => {
  //
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [uImg, setUImg] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${globalVars.PORT}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        let result = await response.json();
        if (!response.ok) {
          throw new Error(`${result.msg}`);
        }
        setUser(result);
        setUImg(result.userImg);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleDeletePhoto = async (e) => {
    e.preventDefault();
    // first delete image from db
    try {
      user.userImg = null;
      const [editUser, delPhoto] = await Promise.all([
        fetch(`${globalVars.PORT}/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }),
        fetch(`${globalVars.PORT}/imgs/${uImg}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }),
      ]);
      let result1 = await editUser.json();
      let result2 = await delPhoto.json();
      if (!editUser.ok && !delPhoto.ok) {
        throw new Error(`${result1.msg} and ${result2.msg}`);
      }
      if (!editUser.ok) {
        throw new Error(`${result1.msg}`);
      }
      if (!editUser.ok) {
        throw new Error(`${result2.msg}`);
      }
      setSuccess("Photo deleted...");
      setTimeout(() => {
        setUImg(null);
        setError(null);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setUImg(null);
  };

  return (
    <div className="bg">
      <Navbar />
      <div className="container profile">
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <div className="profile-divs">
          <div className="profile-left">
            <div className="photo">
              {uImg ? (
                <ImgReady userImg={uImg} imgClass="image" />
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
            <UserInfo user={user} />
            <PasswordChange user={user} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
