const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

exports.getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({published: true}).populate("user", "name username").sort({date: 1}).exec();
        const response = {
            success: true,
            data: allPosts,
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "Data not feteched"
        };

        console.log(error.message);
        res.status(400).json(response);
    }
}

exports.getPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId).populate("user", "username name").exec();
        const response = {
            success: true,
            post,
        }

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "Data not found for specific id"
        }

        console.log(error.message);
        res.status(400).json(response);
    }
}

exports.getAllComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.find({post: postId});
        const response = {
            success: true,
            data: comments,
            postId: postId,
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "No such post with that id"
        };

        console.log(error.message);
        res.status(400).json(response);
    }
}