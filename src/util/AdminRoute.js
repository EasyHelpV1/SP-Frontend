/*jshint esversion:8*/
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import PageNotFound from "../pages/PageNotFound";

const AdminRoute = (props) => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  const adminAuth = () => {
    const userToken = localStorage.getItem("token");

    if (!userToken || userToken === "undefined") {
      setIsAdmin(false);
      // return <div>Not Authorized</div>;
      // throw new Error("No valid token");
      return navigate("/auth");
    }

    const payload = jwtDecode(userToken);

    if (payload.role !== "admin") {
      setIsAdmin(false);
      // return <div>Not an Admin</div>;
      return navigate("/auth");
    }

    ////
    setIsAdmin(true);
    ////
  };

  useEffect(() => {
    adminAuth();
  }, [isAdmin]);

  return <React.Fragment>{isAdmin ? props.children : null}</React.Fragment>;
};

export default AdminRoute;
