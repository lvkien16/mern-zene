import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CreatePost from "../components/home/CreatePost";
import { useEffect, useState } from "react";
import PostsForNewsFeed from "../components/home/PostsForNewsFeed";
import SuggestUsers from "../components/home/SuggestUsers";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/home/getposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="flex justify-center mt-4">
        <div className="create-a-post py-2 w-full">
          <CreatePost />
        </div>
      </div>
      <div className="newsfeed mt-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="newsfeed-post">
              <PostsForNewsFeed post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-primary font-semibold">
            Follow for more posts
          </div>
        )}
      </div>
      <div className="suggest-users">
        <SuggestUsers />
      </div>
    </div>
  );
}
