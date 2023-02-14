const userLoggedIn = (data) => {
  console.log(data.user.name);
  localStorage.setItem("token", data.token);
  //handle invalid login
};

export default userLoggedIn;
