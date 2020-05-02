const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const isPostOwner = require('../middlewares/isPostOwner');

const { getComments, addComment, editComment, deleteComment } = require('../controllers/commentController');

//get comments
router.get('/:postId', getComments);

//add comment to blog post
router.post('/', checkAuth, addComment);

//edit comment
router.patch('/:id', checkAuth, editComment);

//delete comment
router.delete('/:id', checkAuth, isPostOwner, deleteComment);

module.exports = router;