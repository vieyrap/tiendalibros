import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import Admin from '../models/admin.js';

passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.use('admin-local', new LocalStrategy(Admin.authenticate()));

passport.serializeUser((user, done) => {
    const { modelName, id } = user;
    done(null, { modelName, id });
});

passport.deserializeUser((serializedUser, done) => {
    const { modelName, id } = serializedUser;
    if (modelName === 'User') {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    } else if (modelName === 'Admin') {
        Admin.findById(id, (err, admin) => {
            done(err, admin);
        });
    } else {
            done(new Error('Invalid user model'));
        }
});