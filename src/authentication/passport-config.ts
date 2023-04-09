const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcryptjs';
import userModel from '../api/models/userModel';

async function initialize(passport: any) {
  passport.use(
    new LocalStrategy(async (username: string, password: string, done: any) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        if (bcrypt.compareSync(password, user.password) === false) {
          return done(null, false, { message: 'Incorrect password' });
        }
        console.log('user logged in', user);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user: any, done: any) => done(null, user._id));
  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
