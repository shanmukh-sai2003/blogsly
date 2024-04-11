const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/posts', postController.getAllPosts);

router.get('/posts/:id', postController.getPost);

router.get('/posts/:id/comments', postController.getAllComments);


module.exports = router;