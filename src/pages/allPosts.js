import React, { useState } from "react";
import Post from "../components/post/Post";
import Navbar from "../components/navbar/Navbar";
import CreatePost from "./createPost";
import userLoggedOut from "../components/navbar/logOut";
import "./allPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  const getData = async function (url) {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setPosts(json));
  };

  getData("http://localhost:5000/api/v1/posts/");

  return (
    <div className="bg">
      <Navbar logOut={true} />
      <div className="container posts">
        <h1 className="title">all posts page</h1>
        <div className="posts-divs">
          <div className="posts-left">
            <div className="create">
              {/* <h2>Create a post div</h2> */}
              <CreatePost />
            </div>
            <div className="messages">
              <h2>Messages div</h2>
            </div>
          </div>
          <div className="posts-right">
            <h2>Recent</h2>
            {posts.map((post) => (
              <Post
                id={post.id}
                title={post.title}
                content={post.content}
                createdBy={post.createdBy}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;

//show all posts
