/* jshint esversion: 8 */
const userRegistered = (data) => {
  console.log(data.user);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  //handle invalid registration
};

export default userRegistered;
