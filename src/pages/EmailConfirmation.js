/* jshint esversion: 8 */
import { React } from "react";
import { useNavigate } from "react-router-dom";

// css
import "./auth.css";

const EmailConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container auth">
        <div className="success-msg">
          <p>Email confirmed! Redirecting...</p>
        </div>
        {setTimeout(() => {
          navigate("/auth");
        }, 3000)}
      </div>
    </div>
  );
};

export default EmailConfirmation;
