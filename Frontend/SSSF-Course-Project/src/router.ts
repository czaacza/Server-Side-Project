import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './auth/auth';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart, updateCartTotal } from './functions/cart';

const router = new Navigo('');

router
  .on('/', async () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    const storedUser = getStoredUser();
    const products = await fetchProducts();
    const storedCart = getStoredCart();
    console.log('storedCart', storedCart);

    contentElement!.innerHTML = index(storedUser, products, storedCart);
    initEventListeners();
  })

  .on('/cart', () => {
    const storedUser = getStoredUser();
    const storedCart = getStoredCart();
    console.log('storedCart', storedCart);

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = cartIndex(storedUser, storedCart);
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
