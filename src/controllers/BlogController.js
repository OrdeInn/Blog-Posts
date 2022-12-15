const BlogService = require('../services/BlogService');


async function createBlog(req, res, next) {
    const blogResult = await BlogService.createNewBlog({
        title: req.body.title,
        content: req.body.content,
        userId: req.userId,
    });

    if (blogResult.error) {
        res.status(500).send({ meesage: blogResult.errorMsg} );
        return;
    }
    
    res.send(blogResult.obj);
    next();
}

async function getBlogByUserId(req, res, next) {
    const userBlogs = await BlogService.getBlogsByUser(req.params.userId);

    if (userBlogs.error) {
        res.status(500).send( {message: userBlogs.errorMsg} );
        return;
    }
    
    res.send(userBlogs.obj);
    next();
}

module.exports = {
    createBlog: createBlog,
    getBlogByUserId: getBlogByUserId
}