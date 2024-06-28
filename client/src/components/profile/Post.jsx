import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${post._id}`);
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [post]);

  return (
    <>
      <img
        src={post.images[0]}
        alt=""
        className="object-cover h-full w-full rounded"
      />
      <Link
        to={`/post/${post._id}`}
        className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center border border-primary rounded justify-center bg-gray-200 bg-opacity-90 gap-2 absolute top-0 bottom-0 left-0 right-0 w-full h-full hover:cursor-pointer"
      >
        <div className="flex items-center text-primary">
          <FaRegHeart className="" />
          <span>{post.likes.length}</span>
        </div>
        <div className="flex items-center text-primary">
          <FaRegComment className="" />
          <span>{comments && comments.length > 0 ? comments.length : 0}</span>
        </div>
      </Link>
    </>
  );
}
