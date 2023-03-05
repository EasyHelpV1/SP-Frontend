/*jshint esversion:8*/
import { React, useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import moment from "moment";

const UserInfo = ({ user }) => {
  const [elementStates, setElementStates] = useState({});

  const [userCopy, setUserCopy] = useState(user);

  // console.log(userCopy);
  // useEffect(() => {
  //   setUserCopy(user);
  // }, [userCopy]);
  // console.log(userCopy);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //user info states
  const [firstN, setFirstN] = useState(userCopy.firstN);
  const [lastN, setLastN] = useState(userCopy.lastN);
  const [email, setEmail] = useState(userCopy.email);
  const [phone, setPhone] = useState(userCopy.phone);

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");

  const editUserInfo = async (e) => {
    e.preventDefault();
    const newUserInfo = { firstN, lastN, email, phone };

    try {
      const response = await fetch(
        `https://sp-backend-b70z.onrender.com/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(newUserInfo),
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let userData = await response.json();
      setUserCopy(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
      // setUser(null);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  function handleToggle(id) {
    setElementStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  }

  return (
    <div className="user-fields">
      <div className="info-field-header">
        <h2>Account Information</h2>
      </div>
      <form onSubmit={editUserInfo}>
        <div className="info-field">
          <p className="a-field">First Name: {user.firstN}</p>
          {elementStates["firstNToggle"] && (
            <input
              id="firstN"
              type="text"
              value={firstN}
              onChange={(e) => {
                setFirstN(e.target.value);
              }}
            />
          )}
          <p className="edit-icon" onClick={() => handleToggle("firstNToggle")}>
            <MdEdit color="#BBEDFD" size={20} />
          </p>
        </div>
        <div className="info-field">
          <p className="a-field">Last Name: {user.lastN}</p>
          {elementStates["lastNToggle"] && (
            <input
              id="lastN"
              type="text"
              value={lastN}
              onChange={(e) => {
                setLastN(e.target.value);
              }}
            />
          )}
          <p className="edit-icon" onClick={() => handleToggle("lastNToggle")}>
            <MdEdit color="#BBEDFD" size={20} />
          </p>
        </div>
        <div className="info-field">
          <p className="a-field">Email: {user.email}</p>
          {elementStates["emailToggle"] && (
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          )}
          <p className="edit-icon" onClick={() => handleToggle("emailToggle")}>
            <MdEdit color="#BBEDFD" size={20} />
          </p>
        </div>
        {userCopy.phone ? (
          <div className="info-field">
            <p className="a-field">Phone: {user.phone}</p>
            {elementStates["phoneToggle"] && (
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            )}
            <p
              className="edit-icon"
              onClick={() => handleToggle("phoneToggle")}
            >
              <MdEdit color="#BBEDFD" size={20} />
            </p>
          </div>
        ) : null}
        <div className="info-field">
          Birth Date: {moment(user.birthDate).utc().format("YYYY-MM-DD")}
        </div>
        {(elementStates["firstNToggle"] ||
          elementStates["lastNToggle"] ||
          elementStates["emailToggle"] ||
          elementStates["phoneToggle"]) && <button>Save Changes</button>}
      </form>
    </div>
  );
};

export default UserInfo;
