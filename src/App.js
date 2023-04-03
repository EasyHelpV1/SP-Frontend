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
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";

//import components
import ProtectedRoute from "./util/ProtectedRoute";
import AdminRoute from "./util/AdminRoute";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/allPosts"
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route exact path="/auth" element={<Auth />} />
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
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </main>
  );
}

export default App;
