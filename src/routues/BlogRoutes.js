const express = require('express');
const router  = express.Router();
const BlogControllers = require('../controllers/BlogController');
const { verifyToken } = require('../middlewares/authJwt');

router.get('/:userId', BlogControllers.getBlogByUserId);
router.post('/', verifyToken, BlogControllers.createBlog);

module.exports = router;