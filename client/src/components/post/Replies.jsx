import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Replies({
  replyComment,
  getTimeAgo,
  comment,
  setReplyComments,
  replyComments,
  setAddReply,
  setCommentLength,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [user, setUser] = useState({});
  const [reply, setReply] = useState("");

  const handleShowReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${replyComment.userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setReply(`@${data.name}` + " ");
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [replyComment.userId]);

  const handleSendReplyComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/replycomment/reply/${comment._id}/${comment.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ content: reply }),
        }
      );
      const data = await res.json();
      setReplyComments([...replyComments, data]);
      setShowReplyForm(false);
      setReply(`@${comment.userId.name}`);
      setAddReply((prev) => !prev);
      setCommentLength((prev) => prev + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex gap-2 items-start">
        <img
          src={user.profilePicture}
          className="h-6 w-6 rounded-full"
          alt=""
        />
        <div className="">
          <Link
            to={`/profile/${user._id}`}
            className="font-semibold text-primary text-sm"
          >
            {user.name}
          </Link>
          <div className="bg-white p-2 rounded-lg">
            <p className="text-sm text-primary">{replyComment.content}</p>
          </div>
          <div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">
                {getTimeAgo(replyComment.createdAt)}
              </p>
              <button
                type="button"
                onClick={handleShowReplyForm}
                className="font-semibold text-gray-500 hover:text-primary"
              >
                Reply
              </button>
            </div>
            {showReplyForm && (
              <form
                className="write-comment flex gap-2 items-center"
                onSubmit={handleSendReplyComment}
              >
                <textarea
                  rows={1}
                  name="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                  className="resize-none outline-none py-1 px-2 text-primary bg-transparent border border-primary rounded w-full flex-grow"
                />
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="border border-primary py-1 px-2 bg-primary text-white rounded hover:bg-transparent hover:text-primary"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
