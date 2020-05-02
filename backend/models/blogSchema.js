const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Comment = require('./commentSchema');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    body: String,
    img: String,
    published: {
        type: Boolean,
        default: false
    },
    tags: [String],
    slug: {
        type: String,
        unique: true
    }
}, {timestamps: true});

//middleware before deleting the post
//delete comments and image header
blogSchema.pre('deleteOne', async function(next) {
    const { _id: postId } = this.getQuery();
    try {
        await cloudinary.uploader.destroy(`blog-headers/${postId}`);
        await Comment.deleteMany({ postId: postId });
    } catch (error) {
        console.log(error);
        return;
    }

    next();
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;