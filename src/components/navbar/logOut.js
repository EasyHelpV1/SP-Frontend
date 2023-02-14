const userLoggedOut = (e) => {
  // e.preventDefault();
  //   console.log(data.user.name);
  localStorage.removeItem("token");
  //handle invalid login
};

export default userLoggedOut;
