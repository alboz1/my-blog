const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'No empty comments allowed']
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
},  {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;