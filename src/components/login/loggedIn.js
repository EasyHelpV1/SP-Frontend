/* jshint esversion: 8 */
const userLoggedIn = (data) => {
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  //handle invalid login
};

export default userLoggedIn;
