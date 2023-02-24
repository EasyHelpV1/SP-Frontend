import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Post from "../components/post/Post";
import "./profile.css";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { imagefrombuffer } from "imagefrombuffer";
import Img from "../components/images/Img";
import ImgReady from "../components/images/ImgReady";

const Profile = () => {
  const [user, setUser] = useState([]);
  // const [userId, setUserId] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const getData = async function (url, mthd, setWhat) {
    const token = localStorage.getItem("token");
    return await fetch(url, {
      method: mthd,
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setWhat(json));
  };

  useEffect(() => {
    getData(`http://localhost:5000/api/v1/users/${userId}`, "GET", setUser);
  }, []);

  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const editUserInfo = (e) => {
    e.preventDefault();
    const newUserInfo = { firstN, lastN, email, phone, password };
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:5000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((response) => response.json())
      .then((json) => setUser(json))
      .then(window.location.reload(false));
  };

  const [toggle, setToggle] = useState(false);

  const handleEditClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg">
      <Navbar />
      <div className="container profile">
        <div className="profile-divs">
          <div className="profile-left">
            <div className="photo">
              {user.userImg ? (
                <ImgReady userImg={user.userImg} />
              ) : (
                <div>
                  <h2>Upload a Profile Picture</h2>
                  <Img />
                </div>
              )}
            </div>
          </div>
          <div className="profile-right">
            <div className="user-fields" id={user.id}>
              <div className="info-field-header">
                <h2>Account Information</h2>
                <p className="edit-icon" onClick={handleEditClick}>
                  <MdEdit color="#BBEDFD" size={20} />
                </p>
              </div>
              <form onSubmit={editUserInfo}>
                <div className="info-field">
                  <p className="a-field">First Name: {user.firstN}</p>
                  {toggle ? (
                    <input
                      id="firstN"
                      type="text"
                      onChange={(e) => setFirstN(e.target.value)}
                      defaultValue={user.firstN || firstN}
                    />
                  ) : null}
                </div>
                <div className="info-field">
                  <p className="a-field">Last Name: {user.lastN} </p>
                  {toggle ? (
                    <input
                      id="lastN"
                      type="text"
                      onChange={(e) => setLastN(e.target.value)}
                      defaultValue={user.lastN || lastN}
                    />
                  ) : null}
                </div>
                <div className="info-field">
                  <p className="a-field">Email Address: {user.email} </p>
                  {toggle ? (
                    <input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={user.email || email}
                    />
                  ) : null}
                </div>

                {user.phone ? (
                  <div className="info-field">
                    <p className="a-field">Phone Number: {user.phone}</p>
                    {toggle ? (
                      <input
                        id="phone"
                        type="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={user.phone || phone}
                      />
                    ) : null}
                  </div>
                ) : null}
                <div className="info-field">
                  <p className="a-field">
                    Birth Date:{" "}
                    {moment(user.birthDate).utc().format("YYYY-MM-DD")}
                  </p>
                </div>
                {toggle ? <button>Save Changes</button> : null}
              </form>
            </div>
            <div className="options">
              <form>
                <h2>Change Password</h2>
                <div className="info-field">
                  <p className="a-field">Old Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                  />
                </div>
                <div className="info-field">
                  <p className="a-field">New Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                  />
                </div>
                <div className="info-field">
                  <p className="a-field">Re-enter New Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                  />
                </div>
                <button>Save Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
