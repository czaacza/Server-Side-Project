import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { notFound, errorHandler } from './middlewares';
import api from './api';

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

app.get('/cart', (req: Request, res: Response) => {
  res.render('cart', { title: 'Express' });
});

app.get('/checkout', (req: Request, res: Response) => {
  res.render('checkout', { title: 'Express' });
});

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
