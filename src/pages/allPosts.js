/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import Post from "../components/post/Post";
import CreatePost from "../components/post/createPost";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "./allPosts.css";
import globalVars from "../globalVars";
import moment from "moment";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostsData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${globalVars.PORT}/posts`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        let result = await response.json();

        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${result.msg}`);
        }

        setPosts(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPostsData();
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
            {!loading && (
              <div>
                {posts.map((post) => (
                  <Post
                    key={post._id}
                    postId={post._id}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                    // createdBy={post.authorName}
                    createdBy={`${post.userData[0].firstN} ${post.userData[0].lastN}`}
                    userPhoto={`${post.userData[0].userImg}`}
                    CreatedAt={moment(post.createdAt)
                      .utc()
                      .format("YYYY-MM-DD")}
                  />
                ))}
              </div>
            )}
            {error && <div className="error-msg">{error}</div>}
            {!loading && posts.length == 0 && (
              <div className="error-msg">No posts yet</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllPosts;
