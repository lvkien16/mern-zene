import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import LikePost from "../post/LikePost";

export default function PostsForNewsFeed({ post }) {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/user/getuser/${post.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUser(data);
    };
    getUser();
  }, [post.userId]);

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
  }, [post._id]);

  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  const handleCommentPost = () => {
    navigate(`/post/${post._id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="p-2 bg-white rounded-lg mb-3">
      <div className="flex gap-2 items-center ">
        <img
          src={user.profilePicture}
          alt=""
          className="rounded-full w-12 h-12 border"
        />
        <div className="">
          <Link
            to={`/profile/${user._id}`}
            className="font-semibold text-primary"
          >
            {user.name}
          </Link>
          <p className="text-gray-400 text-sm">{getTimeAgo(post.createdAt)}</p>
        </div>
      </div>
      <div className="my-3 text-primary">
        <p>{post.content}</p>
      </div>
      <div className="mt-4">
        {post.images && post.images.length > 1 ? (
          <Slider {...settings}>
            {post.images.map((image, index) => (
              <div key={index}>
                <div className="relative">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-96 object-cover"
                  />
                  <span className="absolute top-0 right-0 px-2 bg-gray-100 text-primary border-l border-b border-secondary font-semibold">
                    {index + 1}/{post.images.length}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src={post.images}
            loading="lazy"
            alt=""
            className="h-80 object-cover overflow-hidden w-full"
          />
        )}
      </div>
      <div className="functions flex justify-between mb-3 mt-5">
        <LikePost post={post} />
        <div
          onClick={handleCommentPost}
          className="text-primary w-full py-3 hover:bg-gray-300 hover:cursor-pointer flex gap-2 items-center px-3"
        >
          <FaRegComment className="" />
          <span>{comments ? comments.length : 0}</span>
        </div>
        <div className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer flex gap-2 items-center px-3">
          <FiShare2 className="text-primary" />
        </div>
      </div>
    </div>
  );
}
