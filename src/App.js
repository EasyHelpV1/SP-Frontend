/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//css
import "./App.css";
// import pages
import AllPosts from "./pages/allPosts";
import CreatePost from "./pages/createPost";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Profile from "./pages/profile";

import ProtectedRoute from "./util/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
//import components

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const checkUserToken = () => {
  //   const userToken = localStorage.getItem("token");
  //   if (!userToken || userToken === "undefined") {
  //     setIsLoggedIn(false);
  //   }
  //   setIsLoggedIn(true);
  // };
  // useEffect(() => {
  //   checkUserToken();
  // }, [isLoggedIn]);

  // return (
  //   <React.Fragment>
  //     {isLoggedIn && <PortalNavbar />}
  //     <Outlet />
  //     {isLoggedIn && <PortalFooter />}
  //   </React.Fragment>
  // );
  return (
    <div>
      <main>
        {/* <Navbar /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/allPosts"
              element={
                <ProtectedRoute>
                  <AllPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createPost"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/allPosts" element={<AllPosts />} />
          <Route path="/createPost" element={<CreatePost />} /> */}
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

export default App;
