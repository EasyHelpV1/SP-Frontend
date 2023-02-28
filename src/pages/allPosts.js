/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import Post from "../components/post/Post";
import CreatePost from "../components/post/createPost";
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
    getData("http://localhost:5000/api/v1/posts/");
  }, []);

  return (
    <div className="bg">
      {/* <Navbar /> */}
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
                postId={post._id}
                title={post.title}
                content={post.content}
                comments={post.replies}
                createdBy={post.authorName}
                CreatedAt={moment(post.createdAt).utc().format("YYYY-MM-DD")}
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
