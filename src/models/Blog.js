const mongoose = require("mongoose");

const Blog = mongoose.model(
    "Blog",
    new mongoose.Schema({
      title: String,
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
      
    })
);

module.exports = Blog;