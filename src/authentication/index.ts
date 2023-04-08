import passport from 'passport';
import { Strategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import userModel from '../api/models/userModel';
import { User, UserLogin } from '../interfaces/User';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({ email: username });
      if (user === null || !user) {
        return done(null, false);
      }

      if (!bcrypt.compareSync(password, user.password!)) {
        return done(null, false);
      }

      const loginUser: UserLogin = user.toObject();
      return done(null, loginUser, { message: 'Logged In Successfully' });
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asdf',
    },
    (jwtPayload, done) => {
      done(null, jwtPayload);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
