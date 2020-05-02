const { User } = require('../models/userSchema');

module.exports = (req, res, next) => {
    User
        .findOne({ resetPasswordToken: req.params.token, tokenExpires: { $gt: Date.now() } })
        .then(user => {
            if (!user) return res.status(401).json({ message: 'Token is invalid or has expired' });

            return next();
        })
        .catch(error => {
            console.log(error);
        });
}