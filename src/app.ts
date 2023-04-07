import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { notFound, errorHandler } from './middlewares';

const app = express();
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

app.get('/cart', (req: Request, res: Response) => {
  res.render('cart', { title: 'Express' });
});

app.get('/checkout', (req: Request, res: Response) => {
  res.render('checkout', { title: 'Express' });
});

export default app;
