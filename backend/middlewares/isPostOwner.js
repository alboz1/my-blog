const BlogPost = require('../models/blogSchema');
const Comment = require('../models/commentSchema');

module.exports = (req, res, next) => {
    Comment
        .findOne({ _id: req.params.id })
        .then(comment => {
            return BlogPost.findOne({ _id: comment.postId });
        })
        .then(post => {
            if (post.userId === req.user._id.toString()) {
                res.locals.isPostOwner = true;
            } else {
                res.locals.isPostOwner = false;
            }
            next();
        })
        .catch(error => {
            console.log(error);
        });
}