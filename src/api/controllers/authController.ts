import { User } from '../../interfaces/User';
import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import { UserMessageResponse } from '../../interfaces/MessageResponse';
import bcrypt from 'bcryptjs';

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

const login = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw new CustomError('Wrong credentials', 401);
    }
    const response: UserMessageResponse = {
      message: 'User logged in',
      user: {
        username: user.username,
        email: user.email,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export { register, login };
