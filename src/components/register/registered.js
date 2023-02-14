const userRegistered = (data) => {
  console.log(data.user.name);
  localStorage.setItem("token", data.token);
  //handle invalid registration
};

export default userRegistered;
