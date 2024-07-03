import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function LikePost({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [likes, setLikes] = useState(post.likes || []);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser._id));

  useEffect(() => {
    setLikes(post.likes || []);
    setIsLiked(post.likes?.includes(currentUser._id) || false);
  }, [post, currentUser._id]);

  const handleLikePost = async (postId) => {
    try {
      const res = await fetch(`/api/post/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (res.ok) {
        const updatedLikes = await res.json();
        setLikes(updatedLikes.likes);
        setIsLiked(updatedLikes.likes.includes(currentUser._id));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div
      onClick={() => {
        handleLikePost(post._id);
      }}
      className="text-primary w-full py-3 hover:bg-gray-300 hover:cursor-pointer flex gap-2 items-center px-3"
    >
      {isLiked ? <FaHeart /> : <FaRegHeart />}
      <span>{likes.length}</span>
    </div>
  );
}
