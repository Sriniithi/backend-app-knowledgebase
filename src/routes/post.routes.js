
const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');

router.get('/', controller.getAllPosts);
router.post('/', controller.createPost);

module.exports = router;
