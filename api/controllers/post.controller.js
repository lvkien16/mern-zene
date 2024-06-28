import Post from "./../models/post.model.js";

export const createPost = async (req, res, next) => {
  if (!req.body.content || !req.body.images) {
    return res.status(400).json({
      success: false,
      message: "Content and image are required",
    });
  }
  const newPost = new Post({
    userId: req.user.id,
    content: req.body.content,
    images: req.body.images,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId });
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "No have posts yet",
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const isLiked = post.likes.includes(req.user.id);
    if (isLiked) {
      post.likes.splice(post.likes.indexOf(req.user.id), 1);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
