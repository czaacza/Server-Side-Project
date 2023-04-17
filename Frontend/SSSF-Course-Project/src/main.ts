// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${index} 
`;

const addToCartBtn = document.querySelector('.add-to-cart-btn');
addToCartBtn?.addEventListener('click', () => {
  console.log('add to cart');
});
