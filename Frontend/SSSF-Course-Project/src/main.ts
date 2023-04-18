// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';
import { initPopupEventListeners } from './functions/popup';
import { initSigninEventListeners } from './functions/signin';
import { getStoredUser } from './auth/auth';
import { initLogoutEventListener } from './functions/logout';
import { fetchProducts } from './products/products';

function initEventListeners(): void {
  initPopupEventListeners();
  initSigninEventListeners();
  initLogoutEventListener();
}

async function initApp(): Promise<void> {
  const storedUser = getStoredUser();
  const products = await fetchProducts();

  console.log(products);

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      ${index(storedUser, products)} 
  `;

  initEventListeners();
}

initApp();
