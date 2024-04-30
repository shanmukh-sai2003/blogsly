const express = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/posts', postController.getAllPosts);

router.get('/posts/all', authController.verifyAccessToken, adminController.getAllPosts);

router.post('/posts', authController.verifyAccessToken, adminController.createPost);

router.get('/posts/:id', postController.getPost);

router.put('/posts/:id', authController.verifyAccessToken, adminController.updatePost);

router.delete('/posts/:id', authController.verifyAccessToken, adminController.deletePost);

router.get('/posts/:id/comments', postController.getAllComments);

router.post('/posts/:id/comments', postController.createComment);

router.post('/posts/:id/like', postController.likePost);

router.post('/posts/:id/removeLike', postController.removePostLike);

router.post('/posts/:id/publish', authController.verifyAccessToken, adminController.publishPost);

router.post('/posts/:id/unpublish', authController.verifyAccessToken, adminController.unpublishPost);

router.post('/users/login', userController.userLogin);

module.exports = router;