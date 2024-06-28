import { useEffect, useState } from "react";

import Post from "./Post";

export default function Posts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts/${userId}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPosts();
  }, [userId]);
  return (
    <>
      <div className="post mt-4 pt-4 border-primary border-t">
        <div className="flex flex-wrap">
          {posts.length === 0 ? (
            <p className="text-primary">No have posts yet</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="relative h-40 border w-1/3 hover:cursor-pointer group rounded "
              >
                <Post post={post} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
