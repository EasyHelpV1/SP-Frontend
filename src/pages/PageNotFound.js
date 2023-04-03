import React from "react";
import pageNotFoundImg from "../assets/pageNotFoundImg.gif";

const PageNotFound = () => {
  return (
    <div>
      <div className="container notFound">
        <h1>
          404: The Page your are looking for could not be found, please verify
          that the url address is correct.
        </h1>
        <img
          className="pagenotfoundimg"
          alt="notfound"
          src={pageNotFoundImg}
        ></img>
      </div>
    </div>
  );
};

export default PageNotFound;
