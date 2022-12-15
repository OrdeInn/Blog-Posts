function BlogService() {
    const Blog = require('../models/Blog');
    
    this.createNewBlog = async function (blogRequest) {
        const result = {
            error: false
        };
    
        try {
            const blog = new Blog({
                title: blogRequest.title,
                content: blogRequest.content,
                author: blogRequest.userId,
            });
            result.obj = await blog.save();
            
        } catch(error) {
            result.error = true;
            result.errorMsg = error.message || "Some error occurred while creating new Blog post." ;
        }
    
        return result;
    };

    this.getBlogsByUser = async function(userId) {
        const result = {
            error: false
        };
    
        try {
            result.obj = await Blog.find({ author: userId });
    
        } catch (error) {
            result.error = true;
            result.errorMsg = error.message || `Error retrieving Blog posts with id: ${userId}`;        
        }
    
        return result;
    };
}

module.exports = new BlogService();