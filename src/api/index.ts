import express from 'express';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import bookRouter from './routes/bookRoute';
import orderRouter from './routes/orderRoute';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/orders', orderRouter);

export default router;
