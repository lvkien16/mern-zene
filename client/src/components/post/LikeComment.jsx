import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function LikeComment({ comment }) {
  const { currentUser } = useSelector((state) => state.user);
  const [likes, setLikes] = useState(comment.likes || []);
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser._id));

  const handleLikeComment = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/like/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
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
    <>
      {isLiked ? (
        <FaHeart
          onClick={() => {
            handleLikeComment(comment._id);
          }}
          className="text-primary hover:cursor-pointer"
        />
      ) : (
        <FaRegHeart
          onClick={() => {
            handleLikeComment(comment._id);
          }}
          className="text-primary hover:cursor-pointer"
        />
      )}
      <span className="text-primary">{likes.length}</span>
    </>
  );
}
