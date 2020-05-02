const bcrypt = require('bcryptjs');

const BlogPost = require('./models/blogSchema');

//save user to the database
function saveUser(user, res) {
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) console.log(err);
        user.password = hash;
        user.save()
            .then(user => {
                res.json({message: 'Account registered successfully'});
            }).catch(error => {
                console.log(error);
            });
    });
}

//save blog to the database
function saveBlog(blogPost, res) {
    blogPost.save().then(() => {
        res.json({ success: 'Blog post saved' });
    }).catch(error => {
        res.status(400).json({ message: error.errors.title.message });
    });
}

//update and save post to database
function updateAndSavePost(req, res) {
    BlogPost
        .updateOne({ userId: req.user._id, _id: req.params.id }, req.body, { runValidators: true })
        .then(() => {
            res.json({success: 'Blog post updated'});
        }).catch(error => {
            res.status(400).json({ message: error.errors.title.message });
        });
}

function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

module.exports = {
    saveUser,
    saveBlog,
    updateAndSavePost,
    slugify
};