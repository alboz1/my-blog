const cloudinary = require('cloudinary').v2;
const passport = require('passport');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

const { User, validateUser } = require('../models/userSchema');
const { saveUser } = require('../utils');
const { transporter } = require('../nodeMailerConfig');

//signup controller
function signUp(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    User
        .findOne({ username: req.body.username })
        .collation({ locale: 'en', strength: 2 })
        .then(user => {
            if (user) {
                return res.status(409).json({ message: 'Username already exists. Please choose another one.' });
            } else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
                //if avatar is empty save the url as an empty string
                if (!req.body.avatar) {
                    user.avatar = req.body.avatar;
                    saveUser(user, res);
                }
                //save avatar to cloudinary
                const saveImage = cloudinary.uploader.upload(req.body.avatar, {
                    public_id: user._id,
                    folder: 'profile-picture'
                });
            
                saveImage.then(result => {
                    user.avatar = result.secure_url;
                    saveUser(user, res);
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

//login controller
function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (info) return res.status(401).send(info);

        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({username: user.username, avatar: user.avatar, id: user._id});
        });

    })(req, res, next);
}

//reset password
function sendEmail(req, res) {
    if (req.isAuthenticated()) return;
    if (!req.body.email) {
        return res.status(400).json({ message: 'An Email is required' });
    }
    const token = crypto.randomBytes(48).toString('hex');

    User
        .findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'No user found with this email' });
            
            user.resetPasswordToken = token;
            const dateNow = new Date(Date.now());
            const expireDate = dateNow.setMinutes(dateNow.getMinutes() + 10);
            user.tokenExpires = expireDate;

            const email = {
                from: process.env.MY_EMAIL,
                to: user.email,
                subject: 'Blogger password reset',
                html: `
                    A request to reset your password has been made. If you did not make this request, please ignore this email.
                    If you made this this request please click on the link below:

                    <a href="${process.env.SITE_URL}/reset-password/${user.resetPasswordToken}">
                        ${process.env.SITE_URL}/reset-password/${user.resetPasswordToken}
                    </a>
                `
            };

            transporter.sendMail(email)
                .then(() => {
                    return user.save();
                })
                .then(user => {
                    res.json({ message: `An email was sent to ${user.email}` });
                })
                .catch(error => {
                    res.status(401).json({ message: error.response });
                });
        })
        .catch(error => {
            console.log(error);
        });
}

//reset password
function resetPassword(req, res) {
    if (req.isAuthenticated()) return;

    const validatePassword = Joi.object({
        password: Joi.string().trim().min(8).max(50).required()
    });
    const { error } = validatePassword.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) console.log(error);

        User
            .findOneAndUpdate({ resetPasswordToken: req.params.token }, { password: hash })
            .then((user) => {
                const email = {
                    from: process.env.MY_EMAIL,
                    to: user.email,
                    subject: 'Password has been changed',
                    html: `
                        Your password for your account - ${user.email} - has been changed. If you didnt make
                        this change please <a href="${process.env.SITE_URL}/forgot-password">reset your password</a>
                    `
                };
                
                user.resetPasswordToken = undefined;
                user.tokenExpires = undefined;
                user.save()
                    .then(() => {
                        return transporter.sendMail(email)
                    })
                    .then(() => {
                        res.json({ message: 'Password has been successfully changed' });
                    })
                    .catch(error => {
                        res.json({ message: error.response });
                    });
            })
            .catch(error => {
                console.log(error);
            });
    });
}

//edit user
function editUser(req, res) {
    User
        .findOne({ username: req.body.username })
        .collation({ locale: 'en', strength: 2 })
        .then(user => {
            if (user && user._id.toString() !== req.user._id.toString()) {
                return res.status(409).json({ message: 'Username already exists. Please choose another one.' });
            }

            User
                .updateOne({ _id: req.user._id }, req.body, { runValidators: true })
                .then((response) => {
                    if (response.nModified) {
                        res.json({ message: 'User data saved' });
                    }
                })
                .catch(error => {
                    res.status(400).json({ message:  error.errors.username.message });
                });
        })
        .catch(error => {
            console.log(error);
        });
}

//logout user controller
function logout(req, res) {
    req.logout();
    res.clearCookie('userSession');
    res.send('Successfully logged out');
}

//get user info for profile page
function getUserInfo(req, res) {
    User.findOne({ username: req.params.name }, 'username avatar')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }).catch(error => {
            console.log(error);
        });
}

module.exports = {
    signUp,
    login,
    sendEmail,
    resetPassword,
    editUser,
    logout,
    getUserInfo
};