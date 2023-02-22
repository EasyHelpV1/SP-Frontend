import React from "react";

const User = ({ id, firstN, lastN, email }) => {
  return (
    <div className="user">
      <div className="user-fields" id={id}>
        <p>{firstN}</p>
        <p>{lastN}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{birthDate}</p>
      </div>
    </div>
  );
};

export default User;
