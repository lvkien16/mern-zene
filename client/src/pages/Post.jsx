import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";
import { FiShare2 } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import LikePost from "../components/post/LikePost";
import CommentPost from "../components/post/CommentPost";
import Comment from "../components/post/Comment";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [showWriteComment, setShowWriteComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentLength, setCommentLength] = useState(0 || comments.length);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost/${postId}`);
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      getPost();
    }
  }, [postId, comments]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments/${postId}`);
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
  }, [postId, commentLength]);

  useEffect(() => {
    if (post.userId) {
      const getUser = async () => {
        const res = await fetch(`/api/user/getuser/${post.userId}`);
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        setUser(data);
      };
      getUser();
    }
  }, [post.userId]);
  return (
    <div className="p-2">
      <div className="flex gap-2 items-center">
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
                    className="w-full h-80 sm:h-96 object-cover"
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
            alt=""
            className="h-80 object-cover overflow-hidden w-full"
          />
        )}
      </div>
      <div className="functions flex justify-between mb-3 border-b border-primary">
        <LikePost post={post} />
        <div
          onClick={() => setShowWriteComment(true)}
          className="text-primary w-full py-3 hover:bg-gray-300 hover:cursor-pointer flex gap-2 items-center px-3"
        >
          <FaRegComment className="" />
          <span>{comments ? comments.length : 0}</span>
        </div>
        <div className="w-full py-3 hover:bg-gray-300 hover:cursor-pointer flex gap-2 items-center px-3">
          <FiShare2 className="text-primary" />
        </div>
      </div>
      <div className={`${showWriteComment ? "block" : "hidden"}`}>
        <CommentPost
          post={post}
          setComments={setComments}
          setCommentLength={setCommentLength}
        />
      </div>
      <div className="mt-4 ">
        {comments.map((comment) => (
          <div key={comment._id}>
            <div className="comment flex-shrink-0 flex mb-5 gap-2">
              <Comment comment={comment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
