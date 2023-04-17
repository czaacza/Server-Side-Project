import app from './app';
import { Request, Response } from 'express';
import Logging from './utils/Logging';

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

export default app;
