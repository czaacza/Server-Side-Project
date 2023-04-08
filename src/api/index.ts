import express from 'express';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import passport from '../authentication';

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
