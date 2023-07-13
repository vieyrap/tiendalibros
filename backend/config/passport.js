import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import Admin from '../models/admin.js';

passport.use('user-local', new LocalStrategy({usernameField:'email'},User.authenticate()))
passport.use('admin-local', new LocalStrategy(Admin.authenticate()));

passport.serializeUser((user, done) => {
  if (user instanceof User) {
    done(null, { modelName: 'User', id: user.id });
  } else if (user instanceof Admin) {
    done(null, { modelName: 'Admin', id: user.id });
  } else {
    done(new Error('Invalid user model'));
  }
});

passport.deserializeUser((serializedUser, done) => {
    const { modelName, id } = serializedUser;
    if (modelName === 'User') {
      User.findById(id)
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          done(err, null);
        });
    } else if (modelName === 'Admin') {
      Admin.findById(id)
        .then(admin => {
          done(null, admin);
        })
        .catch(err => {
          done(err, null);
        });
    } else {
      done(new Error('Invalid user model'));
    }
  });