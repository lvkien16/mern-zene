import { Link } from "react-router-dom";
import LikeComment from "./LikeComment";
import moment from "moment";

export default function Comment({ comment }) {
  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };
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

            <div className="text-sm text-gray-500">
              {getTimeAgo(comment.createdAt)}
            </div>
          </div>
          <div className="flex-col text-center">
            <LikeComment comment={comment} />
          </div>
        </div>
      </div>
    </>
  );
}
