const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const cloudinary = require('cloudinary').v2;

const BlogPost = require('./blogSchema');
const Comment = require('./commentSchema');

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().required().email({minDomainSegments: 2}),
        password: Joi.string().trim().min(8).max(50).required(),
        avatar: Joi.string().allow('')
    });

    return schema.validate(user);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        minlength: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    avatar: String,
    resetPasswordToken: String,
    tokenExpires: {
        type: Date,
        default: undefined
    }
});

//middlewares
userSchema.pre('updateOne', async function(next) {
    const { _id: userId } = this.getQuery();
    const { username, avatar } = this.getUpdate();

    try {
        await BlogPost.updateMany({ userId: userId }, { author: username }, { runValidators: true, timestamps: false });
        await Comment.updateMany({ authorId: userId }, { author: username }, { runValidators: true, timestamps: false });
    } catch (error) {
        console.log(error);
        return;
    }

    if (!avatar) {
        await cloudinary.uploader.destroy(`profile-picture/${userId}`);
        this.getUpdate().avatar = '';
        next();
    } else {
        // save avatar to cloudinary
        const result = await cloudinary.uploader.upload(avatar, {
            public_id: userId,
            folder: 'profile-picture'
        });
        this.getUpdate().avatar = result.secure_url;
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User, validateUser};
