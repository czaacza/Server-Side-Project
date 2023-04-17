// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';
import { initPopupEventListeners } from './functions/popup';
import { initSigninEventListeners } from './functions/signin';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${index()} 
`;

function initEventListeners(): void {
  initPopupEventListeners();
  initSigninEventListeners();
}

initEventListeners();
