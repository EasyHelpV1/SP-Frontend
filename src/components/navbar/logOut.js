/* jshint esversion: 8 */
const userLoggedOut = (e) => {
  // e.preventDefault();
  //   console.log(data.user.name);
  localStorage.clear();
  //handle invalid login
  window.location.reload();
};

export default userLoggedOut;
