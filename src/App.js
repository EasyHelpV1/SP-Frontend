/* jshint esversion: 8 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//css
import "./App.css";
// import pages
import AllPosts from "./pages/allPosts";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import OtherUser from "./components/otherUser/OtherUser";
import EmailConfirmation from "./pages/EmailConfirmation";

//import components
import ProtectedRoute from "./util/ProtectedRoute";

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
          <Route path="/confirmed" element={<EmailConfirmation />} />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <OtherUser />
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
