const cloudinary = require('cloudinary').v2;

const BlogPost = require('../models/blogSchema');
const { slugify, saveBlog, updateAndSavePost } = require('../utils');

//create post controller
function createPost(req, res) {
    const blogPost = new BlogPost({
        title: req.body.title,
        author: req.user.username,
        userId: req.user._id,
        body: req.body.body,
        tags: req.body.tags
    });
    blogPost.slug = `${slugify(blogPost.title)}-${blogPost._id}`;

    //check if the user selected a header image for the blog
    if (!req.body.img) {
        blogPost.img = req.body.img;
        saveBlog(blogPost, res);
    }

    //save image header to cloudinary
    const saveImage = cloudinary.uploader.upload(req.body.img, {
        public_id: blogPost._id,
        folder: 'blog-headers'
    });
    saveImage.then(result => {
        blogPost.img = result.secure_url;
        saveBlog(blogPost, res);
    });
}

//update post controller
function updatePost(req, res) {
    //set slug for the post
    req.body.slug = `${slugify(req.body.title)}-${req.params.id}`;

    if (!req.body.img) {
        cloudinary.uploader.destroy(`blog-headers/${req.params.id}`, (error, result) => {
            if (error) throw error;
            req.body.img = '';
            updateAndSavePost(req, res);
        });
    } else {
        const saveImage = cloudinary.uploader.upload(req.body.img, {
            public_id: req.params.id,
            folder: 'blog-headers'
        });
        saveImage
            .then(result => {
                req.body.img = result.secure_url;
                updateAndSavePost(req, res);
            });
    }
}

//publish post controller
function publishPost(req, res) {
    BlogPost.updateOne({ userId: req.user._id, _id: req.params.id }, { published: true })
        .then(() => {
            res.json({ message: 'Blog post published' });
        }).catch(error => {
            res.status(404).json({ message: 'Something went wrong! Could\'nt publish post' });
        });
}

//unpublish post controller
function unpublishPost(req, res) {
    BlogPost.updateOne({ userId: req.user._id, _id: req.params.id }, { published: false })
        .then(() => {
            res.json({ message: 'Blog post unpublished' });
        }).catch(error => {
            res.status(404).json({ message: 'Something went wrong! Could\'nt unpublish post' });
        });
}

//delete post controller
function deletePost(req, res) {
    BlogPost.deleteOne({ userId: req.user._id, _id: req.params.id })
        .then((response) => {
            if (!response.n) throw new Error('post not found');
            res.json({ message: 'Blog post deleted' });
        }).catch(() => {
            res.status(404).json({ message: 'Something went wrong! Could\'nt delete post' });
        });
}

//get all posts that are published
function getPublishedPosts(req, res) {
    //if the param is string allPosts, get all posts
    if (req.params.page === 'allPosts') {
        BlogPost.find({ published: true })
            .then(posts => {
                res.json(posts);
            })
            .catch(error => {
                console.log(error);
            })
    } else {
        //else get the specific page
        const postsPerPage = 10;
        const page = req.params.page > 0 ? req.params.page : 0;

        BlogPost
            .find({ published: true })
            .limit(postsPerPage)
            .skip(postsPerPage * page)
            .sort({ updatedAt: 'desc' })
            .then(posts => {
                res.json(posts);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

//get required post
function getPost(req, res) {
    BlogPost
        .findOne({ slug: req.params.slug })
        .then(post => {
            if (!post) return res.status(404).json({ message: 'Post not found' });

            res.json(post);
        })
        .catch(error => {
            console.log(error);
        });
}

//get post by id
function getPostById(req, res) {
    BlogPost
        .findOne({ _id: req.params.id })
        .then(post => {
            if (!post) return res.status(404).json({ message: 'Post not found' });

            res.json(post);
        })
        .catch(error => {
            console.log(error);
        });
}

//get user's posts to show them on dashboard
function getUserPosts(req, res) {
    const postsPerPage = 10;
    const page = req.params.page > 0 ? req.params.page : 0;

    BlogPost
        .find({ userId: req.user._id })
        .limit(postsPerPage)
        .skip(postsPerPage * page)
        .sort({ updatedAt: 'desc' })
        .then(posts => {
            res.json(posts);
        });
}

//get tags
function getTags(req, res) {
    const tags = [];

    BlogPost
        .find({ published: true })
        .then(posts => {
            posts.forEach(post => {
                post.tags.forEach(tag => tags.push(tag));
            });

            //remove all duplicate tags
            const uniqueTags = [...new Set(tags)];
            res.json(uniqueTags);
        })
        .catch(error => {
            console.log(error);
        });
}

function getPostsByTag(req, res) {
    BlogPost
        .find({ published: true })
        .then(posts => {
            const relatedPosts = posts.filter(post => post.tags.includes(req.params.name));
            if (!relatedPosts.length) return res.status(404).json({ message: `No posts with ${req.params.name} tag` });
            res.json(relatedPosts);
        })
        .catch(error => {
            console.log(error);
        });
}

//get posts for user to show on profile page
function getProfilePosts(req, res) {
    const postsPerPage = 10;
    const page = req.params.page > 0 ? req.params.page : 0;

    BlogPost
        .find({ author: req.params.author, published: true })
        .limit(postsPerPage)
        .skip(postsPerPage * page)
        .sort({ updatedAt: 'desc'})
        .then(posts => {
            res.json(posts);
        }).catch(error => {
            console.log(error);
        })
}

module.exports = {
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
};