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
      <Navbar logOut={true} profile={true} posts={true} />
      <div className="container profile">
        <div className="profile-divs">
          <div className="profile-left">
            <div className="photo">
              {user.userImg ? <ImgReady userImg={user.userImg} /> : <Img />}
            </div>
            {/* <div className="options">options div</div> */}
          </div>
          <div className="profile-right">
            <div className="user-fields" id={user.id}>
              <div className="info-field-header">
                <h2>{user.firstN}'s Info</h2>
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
                      value={firstN}
                      onChange={(e) => setFirstN(e.target.value)}
                      placeholder="Enter a name"
                    />
                  ) : null}
                  {/* <p className="edit-icon" onClick={handleEditClick}>
                    <MdEdit color="#BBEDFD" size={20} />
                  </p> */}
                </div>
                <div className="info-field">
                  <p className="a-field">Last Name: {user.lastN} </p>
                  {toggle ? (
                    <input
                      id="lastN"
                      type="text"
                      value={lastN}
                      onChange={(e) => setLastN(e.target.value)}
                      placeholder="Enter a name"
                    />
                  ) : null}
                  {/* <p className="edit-icon" onClick={handleEditClick}>
                    <MdEdit color="#BBEDFD" size={20} />
                  </p> */}
                </div>
                <div className="info-field">
                  <p className="a-field">Email Address: {user.email} </p>
                  {toggle ? (
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter an email address"
                    />
                  ) : null}
                  {/* <p className="edit-icon" onClick={handleEditClick}>
                    <MdEdit color="#BBEDFD" size={20} />
                  </p> */}
                </div>
                <div className="info-field">
                  <p className="a-field">Password: *********** </p>
                  {toggle ? (
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a password"
                    />
                  ) : null}
                  {/* <p className="edit-icon" onClick={handleEditClick}>
                    <MdEdit color="#BBEDFD" size={20} />
                  </p> */}
                </div>
                {user.phone ? (
                  <div className="info-field">
                    <p className="a-field">Phone Number{user.phone}</p>
                    {toggle ? (
                      <input
                        id="phone"
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter a phone number"
                      />
                    ) : null}
                    {/* <p className="edit-icon" onClick={handleEditClick}>
                      <MdEdit color="#BBEDFD" size={20} />
                    </p> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
