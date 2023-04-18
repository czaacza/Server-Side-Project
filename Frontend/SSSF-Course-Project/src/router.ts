import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './auth/auth';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart } from './functions/cart';

const router = new Navigo('');

router
  .on('/', async () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    const storedUser = getStoredUser();
    const products = await fetchProducts();
    const storedCart = getStoredCart();

    contentElement!.innerHTML = index(storedUser, products);
    initEventListeners();
  })

  .on('/cart', () => {
    const storedUser = getStoredUser();
    const storedCart = getStoredCart();

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = cartIndex();
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
