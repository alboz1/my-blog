const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');
const checkToken = require('../middlewares/checkToken');

const {
    signUp,
    login,
    editUser,
    logout,
    getUserInfo,
    sendEmail,
    resetPassword
} = require('../controllers/userController');

//sign up user
router.post('/signup', signUp);

//login user
router.post('/login', login);

//send reset password email
router.post('/forgot_password', sendEmail);

//check token for reset password link
router.get('/reset_password/:token', checkToken, (req, res) => res.json({ ok: true }));

//reset password
router.post('/reset_password/:token', checkToken, resetPassword);

//edit user
router.put('/edit', checkAuth, editUser);

//logout user
router.get('/logout', logout);

//get user for the profile page
router.get('/:name', getUserInfo);

//send user's username and avatar if he is logged in
router.get('/', checkAuth, (req, res) => {
    res.json({
        username: req.user.username,
        avatar: req.user.avatar,
        id: req.user._id
    });
});


module.exports = router;