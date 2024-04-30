const {body, validationResult, param} = require('express-validator');
const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const blogsList = await Post.find().exec();
        const response = {
            success: true,
            data: blogsList,
        }
        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "unable to fetch data from database"
        }
        console.log(error.message);
        res.status(500).json(response);
    }
}


exports.createPost = [
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({success: false, errors: errors.array()});
        }

        try {
            const title = req.body.title;
            const content = req.body.content;
            const userId = req.user.userId;
            const post = new Post({title: title, content: content, user: userId});
            await post.save();
            const response = {
                success: true,
                post: post
            };

            res.status(200).json(response);
        } catch (error) {
            const response = {
                success: false,
                messsage: "post not created"
            };
            res.status(500).json(response);
        }
    }
];

exports.publishPost = async (req, res) => {
    const postId = req.params.id;
    try {
        await Post.findByIdAndUpdate(postId, {published: true}).exec();
        const response ={
            success: true,
            message: "post published"
        };
        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "no post found with the id"
        };
        res.status(400).json(response);
    }
}

exports.unpublishPost = async (req, res) => {
    const postId = req.params.id;
    try {
        await Post.findByIdAndUpdate(postId, {published: false}).exec();
        const response ={
            success: true,
            message: "post unpublished"
        };
        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "no post found with the id"
        };
        res.status(400).json(response);
    }
}

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        await Post.findByIdAndDelete(postId).exec();
        const response = {
            success: true,
            message: "deleted the post"
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "no such post to delete"
        };

        res.status(400).json(response);
    }
}

exports.updatePost = [
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty(),
    param('id').trim().notEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const response = {
                success: false,
                errors: errors.array()
            }

            return res.status(400).json(response);
        }

        try {
            const postId = req.params.id;
            const title = req.body.title;
            const content = req.body.content;
            await Post.findByIdAndUpdate(postId, {title: title, content: content}).exec();
            const response = {
                success: true,
                message: "post updated"
            };
            res.status(200).json(response);
        } catch (error) {
            const response = {
                success: false,
                message: "no push post with the id"
            };

            res.status(400).json(response);
        }
    }
];