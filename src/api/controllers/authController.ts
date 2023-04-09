import { User } from '../../interfaces/User';
import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import { UserMessageResponse } from '../../interfaces/MessageResponse';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const salt = bcrypt.genSaltSync(10);

const register = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  console.log('body:', req.body);

  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();

    if (!savedUser) {
      throw new CustomError('Could not save user', 500);
    }

    const response: UserMessageResponse = {
      message: 'User created',
      user: {
        username: savedUser.username,
        email: savedUser.email,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export { register };
