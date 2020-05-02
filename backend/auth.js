const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { User } = require('./models/userSchema');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    
    //passport local strategy
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return done(err);
            }
    
            if (!user) return done(null, false, {message: 'Email or password incorrect'});
    
            bcrypt.compare(password, user.password).then(res => {
                return res ? done(null, user) : done(null, false, {message: 'Email or password incorrect'})
            });
        })
    }));
}