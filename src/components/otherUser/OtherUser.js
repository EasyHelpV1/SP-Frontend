/*jshint esversion: 8*/
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ImgReady from "../images/ImgReady";
import globalVars from "../../globalVars";

const OtherUser = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [uImg, setUImg] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
        setUserInfo(result);
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

  if (!loading) {
    return (
      <div className="bg">
        <Navbar />
        <div className="container profile">
          {error && <div className="error-msg">{error}</div>}

          <div className="profile-divs">
            <div className="profile-left">
              <div className="photo">
                {console.log(uImg)}
                <ImgReady userImg={uImg} imgClass="image" />
              </div>
            </div>

            <div className="profile-right">
              <div className="user-fields">
                <div className="info-field-header">
                  <h2>Account Information</h2>
                </div>
                <form>
                  <div className="info-field">
                    <p className="a-field">First Name: {userInfo.firstN}</p>
                  </div>
                  <div className="info-field">
                    <p className="a-field">Last Name: {userInfo.lastN}</p>
                  </div>
                  <div className="info-field">
                    <p className="a-field">Email: {userInfo.email}</p>
                  </div>

                  <div className="info-field">
                    Birth Date:{" "}
                    {moment(userInfo.birthDate).utc().format("YYYY-MM-DD")}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="bg">
        <Navbar />
        <div className="container profile">Loading...</div>
      </div>
    );
  }
};

export default OtherUser;
