const userLoggedIn = (data) => {
  console.log(data.user);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  //handle invalid login
};

export default userLoggedIn;