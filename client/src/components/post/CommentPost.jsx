import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommentPost({ post, setComments, setCommentLength }) {
  const { currentUser } = useSelector((state) => state.user);
  const [commentContent, setCommentContent] = useState("");

  const handleSendComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comment/create/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          content: commentContent,
          userId: currentUser._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCommentContent("");
        setComments((prev) => [data, ...prev]);
        setCommentLength((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSendComment}
      className="write-comment flex gap-2 items-center border-b pb-3 border-primary"
    >
      <div className="flex-shrink-0">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="w-12 h-12 object-cover rounded-full border"
        />
      </div>
      <textarea
        rows={1}
        placeholder="Write a comment..."
        name="comment"
        required
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="resize-none outline-none p-2 text-primary bg-transparent border border-primary rounded w-full flex-grow"
      />
      <div className="flex-shrink-0">
        <button
          type="submit"
          className="border border-primary py-2 px-2 bg-primary text-white rounded hover:bg-transparent hover:text-primary"
        >
          Send
        </button>
      </div>
    </form>
  );
}
