/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import Post from "../components/post/Post";
import CreatePost from "../components/post/createPost";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./allPosts.css";
import moment from "moment";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const getData = async function (url) {
    const token = localStorage.getItem("token");
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

  useEffect(() => {
    getData("https://sp-backend-b70z.onrender.com/api/v1/posts/");
  }, []);

  return (
    <div className="bg">
      <Navbar />
      <div className="container posts">
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
            {posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                title={post.title}
                content={post.content}
                comments={post.comments}
                // createdBy={post.authorName}
                createdBy={`${post.userData[0].firstN} ${post.userData[0].lastN}`}
                CreatedAt={moment(post.createdAt).utc().format("YYYY-MM-DD")}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllPosts;
