import { Router, Request, Response, NextFunction } from 'express';
import { register } from '../controllers/authController';
import { checkNotAuthenticated } from '../../middlewares';
const passport = require('passport').Passport;

console.log(passport);

const router = Router();

router.post('/register', checkNotAuthenticated, register);

export default router;
