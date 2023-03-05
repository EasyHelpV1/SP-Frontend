/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//css
import "./App.css";
// import pages
import AllPosts from "./pages/allPosts";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Profile from "./pages/profile";

import ProtectedRoute from "./util/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
//import components

function App() {
  return (
    <main>
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
      {/* <Footer /> */}
    </main>
  );
}

export default App;
