const Comment = require('../models/commentSchema');

//get comments
function getComments(req, res) {
    Comment
        .find({ postId: req.params.postId })
        .sort({ createdAt: -1 })
        .then(postComments => {
            res.json(postComments);
        })
        .catch(error => {
            console.log(error);
        });
}

//add new comment
function addComment(req, res) {
    const newComment = new Comment({
        body: req.body.comment.trim(),
        author: req.user.username,
        authorId: req.user._id,
        postId: req.body.postId
    });

    newComment
        .save()
        .then(addedComment => {
            res.json(addedComment);
        })
        .catch(error => {
            res.status(400).json({ message: error.errors.body.message });
        });
}

//edit comment
function editComment(req, res) {
    const edit = {
        body: req.body.comment.trim()
    };

    Comment
        .findOneAndUpdate({ _id: req.params.id, authorId: req.user._id }, edit, { runValidators: true })
        .then((comment) => {
            if (!comment) return res.status(404).json({ message: 'No comment found. Could\'nt save comment' });
            res.json({ message: 'Comment saved' });
        })
        .catch((error) => {
            res.status(400).json({ message: error.errors.body.message });
        });
}

//delete comment
function deleteComment(req, res) {
    Comment
        .deleteOne(res.locals.isPostOwner ? { _id: req.params.id } : { authorId: req.user._id, _id: req.params.id })
        .then((response) => {
            if (!response.n) return res.status(404).json({ message: 'Could\'nt delete comment.' });
            res.json({ message: 'Comment deleted' });
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    getComments,
    addComment,
    editComment,
    deleteComment
};