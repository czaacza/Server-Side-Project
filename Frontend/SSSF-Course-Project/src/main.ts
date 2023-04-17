// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import index from './views/index/index';
import { initPopupEventListeners } from './functions/popup';
import { initSigninEventListeners } from './functions/signin';
import { getStoredUser } from './auth/auth';
import { initLogoutEventListener } from './functions/logout';

const storedUser = getStoredUser();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${index(storedUser)} 
`;

function initEventListeners(): void {
  initPopupEventListeners();
  initSigninEventListeners();
  initLogoutEventListener();
}

initEventListeners();
