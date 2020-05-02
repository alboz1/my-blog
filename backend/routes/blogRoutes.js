const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');

const {
    createPost,
    updatePost,
    publishPost,
    unpublishPost,
    deletePost,
    getPublishedPosts,
    getUserPosts,
    getPost,
    getPostById,
    getTags,
    getPostsByTag,
    getProfilePosts
} = require('../controllers/blogController');

//save blog post to the database
router.post('/new', checkAuth, createPost);

//update blog post
router.put('/update/:id', checkAuth, updatePost);

//publish blog post
router.put('/publish/:id', checkAuth, publishPost);

//make blog post private
router.put('/private/:id', checkAuth, unpublishPost);

//delete blog post
router.delete('/delete/:id', checkAuth, deletePost);

//get required post
router.get('/post/:slug', getPost);

//get post by id
router.get('/update/post/:id', checkAuth, getPostById);

//get post by tag
router.get('/tags/:name', getPostsByTag);

//get all posts from all users
router.get('/home/:page', getPublishedPosts);

//get tags
router.get('/tags', getTags);

//get blog posts for users that are logged in to show in their dashboard
router.get('/dashboard/:page', checkAuth, getUserPosts);

//get posts for the profile page
router.get('/:author/:page', getProfilePosts);

module.exports = router;