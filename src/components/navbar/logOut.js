/* jshint esversion: 8 */
const userLoggedOut = (e) => {
  // e.preventDefault();
  //   console.log(data.user.name);
  localStorage.clear();
  window.location.reload(false);
};

export default userLoggedOut;
