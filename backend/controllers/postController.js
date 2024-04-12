const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const {body, validationResult, param} = require('express-validator');

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

exports.likePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findOneAndUpdate({_id: postId}, {$inc: {likes: 1}}).exec();
        const response = {
            success: true,
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "no such post"
        };
        console.log(error.message);
        res.status(400).json(response);
    }
}

exports.removePostLike = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findOneAndUpdate({_id: postId}, {$inc: {likes: -1}}).exec();
        const response = {
            success: true,
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "no such post"
        };
        console.log(error.message);
        res.status(400).json(response);
    }
}

exports.createComment = [
    body('username').trim().notEmpty(),
    body('message').trim().notEmpty(),
    param('id').trim().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response ={
                success: false,
                errors: errors.array(),
            };

            res.status(400).json(response);
            return;
        }

        const postId = req.params.id;
        const comment = new Comment({post: postId, username: req.body.username, message: req.body.message});
        await comment.save();

        const response = {
            success: true,
            comment: comment
        };

        res.status(200).json(response);
    }
];