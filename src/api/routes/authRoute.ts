import { Router, Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import { login, register } from '../controllers/authController';
import passport from '../../authentication';
import { User } from '../../interfaces/User';

const router = Router();

router.post('/register', register);

router.post('/login', passport.authenticate('local', {}));

router.get(
  '/logout',
  function (req: Request, res: Response, next: NextFunction) {
    console.log('logged in as: ', req.user);
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log('successfully logged out');
      res.redirect('/');
    });
  }
);

export default router;
