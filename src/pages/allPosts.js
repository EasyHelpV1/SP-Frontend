/* jshint esversion: 8 */
import React, { useState, useEffect } from "react";
import moment from "moment";
// import components
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
//import vars
import globalVars from "../globalVars";
//css
import "./allPosts.css";

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
          throw new Error(`${result.msg}`);
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
              <CreatePost />
            </div>
            {/* <div className="messages">
              <h2>Messages div</h2>
            </div> */}
          </div>
          <div className="posts-right">
            {!loading && (
              <div>
                {posts.map((post) => (
                  <Post
                    key={post._id}
                    postId={post._id}
                    title={post.title}
                    date={moment(post.date).utc().format("lll")}
                    location={post.location}
                    money={post.money}
                    time={post.time}
                    urgency={post.urgency}
                    content={post.content}
                    comments={post.comments}
                    createdById={post.createdBy}
                    createdBy={`${post.userData[0].firstN} ${post.userData[0].lastN}`}
                    userPhoto={
                      post.userData[0].userImg
                        ? `${post.userData[0].userImg}`
                        : `641d1dcd34c9ed492688ecfa`
                    }
                    CreatedAt={moment(post.createdAt).utc().format("lll")}
                    // .format("MMMM Do YYYY, h:mm:ss a")
                  />
                ))}
              </div>
            )}
            {error && <div className="error-msg">{error}</div>}
            {!loading && posts.length === 0 && (
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
