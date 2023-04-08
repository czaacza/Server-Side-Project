import { Router } from 'express';
import User from '../models/userModel';
import { login, register } from '../controllers/authController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

export default router;
