const Blog = require('../models/Blog');

async function createBlog(req, res, next) {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.userId,
        });

        let blogData = await blog.save();
        res.send(blogData);
    } catch(error) {
        res.status(500).send({ message: error.message || "Some error occurred while creating the Blog post."});
    }

    next();
}

async function getBlogByUserId(req, res, next) {
    const userId = req.params.userId;

    try {
        const blogPosts = await Blog.find({ author: userId });
        res.send(blogPosts);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving Blog posts with id=" + id });
    }

    next();
}

module.exports = {
    createBlog: createBlog,
    getBlogByUserId: getBlogByUserId
}