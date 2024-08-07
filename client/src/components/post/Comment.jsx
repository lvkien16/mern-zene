import { Link } from "react-router-dom";
import LikeComment from "./LikeComment";
import moment from "moment";
import { useEffect, useState } from "react";
import Replies from "./Replies";

export default function Comment({ comment, setCommentLength }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [user, setUser] = useState({});
  const [reply, setReply] = useState(`@${user.name}`);
  const [replyComments, setReplyComments] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

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
      setCommentLength((prev) => prev + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        setReply(`@${data.name}` + " ");
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userId._id]);

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
  }, [comment._id, addReply]);

  return (
    <>
      <img
        src={user.profilePicture}
        alt=""
        className="w-12 h-12 object-cover rounded-full border"
      />
      <div className="flex-grow">
        <Link
          to={`/profile/${user._id}`}
          className="font-semibold text-primary"
        >
          {user.name}
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

            {showReplyForm && (
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
              <>
                <button
                  className="flex  gap-1 items-center font-semibold text-gray-500 hover:text-primary mt-1"
                  type="button"
                  onClick={handleShowReplies}
                >
                  {showReplies ? "Hide" : "View"} {replyComments.length}{" "}
                  {replyComments.length > 1 ? "replies" : "reply"}{" "}
                </button>
                <div className="">
                  {showReplies &&
                    replyComments.length > 0 &&
                    replyComments.map((replyComment) => (
                      <div key={replyComment._id}>
                        <Replies
                          setCommentLength={setCommentLength}
                          addReply={addReply}
                          setAddReply={setAddReply}
                          replyComment={replyComment}
                          getTimeAgo={getTimeAgo}
                          comment={comment}
                          setReplyComments={setReplyComments}
                          replyComments={replyComments}
                        />
                      </div>
                    ))}
                </div>
              </>
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
