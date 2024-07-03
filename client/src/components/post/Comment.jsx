import { Link } from "react-router-dom";
import LikeComment from "./LikeComment";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Comment({ comment }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState(`@${comment.userId.name}`);
  const [replyComments, setReplyComments] = useState([]);

  const handleReply = () => {
    setShowReply(!showReply);
  };

  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  const handleSendReplyComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/replycomment/reply/${comment._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ content: reply }),
      });
      const data = await res.json();
      setReplyComments([...replyComments, data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getReplyComments = async () => {
      try {
        const res = await fetch(`/api/replycomment/get/${comment._id}`);
        const data = await res.json();
        setReplyComments(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReplyComments();
  }, [comment._id]);

  return (
    <>
      <img
        src={comment.userId.profilePicture}
        alt=""
        className="w-12 h-12 object-cover rounded-full border"
      />
      <div className="flex-grow">
        <Link
          to={`/profile/${comment.userId._id}`}
          className="font-semibold text-primary"
        >
          {comment.userId.name}
        </Link>
        <div className="flex justify-between gap-3">
          <div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-primary ">{comment.content}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="text-sm text-gray-500">
                {getTimeAgo(comment.createdAt)}
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleReply}
                  className="text-gray-500 hover:text-primary font-semibold"
                >
                  Reply
                </button>
              </div>
            </div>

            {showReply && (
              <form
                className="write-comment flex gap-2 items-center"
                onSubmit={handleSendReplyComment}
              >
                <textarea
                  rows={1}
                  name="comment"
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
            {replyComments.length > 0 && (
              <div className="bg-gray-100 p-3 rounded-lg mt-2">
                {replyComments.map((replyComment) => (
                  <div key={replyComment._id}>
                    <p className="text-primary">{replyComment.content}</p>
                    <div className="flex gap-2 items-center">
                      <div className="text-sm text-gray-500">
                        {getTimeAgo(replyComment.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-col text-center">
            <LikeComment comment={comment} />
          </div>
        </div>
      </div>
    </>
  );
}
