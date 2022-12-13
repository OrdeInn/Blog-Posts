const express = require('express');
const router  = express.Router();
const BlogControllers = require('../controllers/BlogController');

router.get('/:userId', BlogControllers.getBlogByUserId);
router.post('/', BlogControllers.createBlog);

module.exports = router;