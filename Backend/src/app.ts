import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import Logging from './utils/Logging';

import { notFound, errorHandler, checkNotAuthenticated } from './middlewares';
import api from './api';

import flash from 'express-flash';
import session from 'express-session';

import jwt from 'jsonwebtoken';
import passport from './authentication/passport-config';

const app = express();

app.set('views', `${__dirname}/../frontend/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/../frontend/views/public`));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  Logging.info(`req.user: ${req.user}`);
  res.render('index', { user: req.user });
});

app.get('/cart', (req: Request, res: Response) => {
  res.render('cart', { user: req.user });
});

app.get('/checkout', (req: Request, res: Response) => {
  res.render('checkout', { user: req.user });
});

app.get('/account', (req: Request, res: Response) => {
  res.render('account', { user: req.user });
});

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
