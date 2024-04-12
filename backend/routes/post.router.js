const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/posts', postController.getAllPosts);

router.get('/posts/:id', postController.getPost);

router.get('/posts/:id/comments', postController.getAllComments);

router.post('/posts/:id/like', postController.likePost);

router.post('/posts/:id/removeLike', postController.removePostLike);

router.post('/posts/:id/comments', postController.createComment);

module.exports = router;