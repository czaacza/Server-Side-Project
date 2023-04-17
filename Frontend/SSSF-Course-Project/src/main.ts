// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import navbar from './views/navbar';
import hero from './views/hero';
import products from './views/products';
import popup from './views/popup';
import signin from './views/signin';
import testimonials from './views/testimonials';

import { setupCounter } from './counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    ${navbar}

    ${hero}

    ${popup}
    
    ${signin}

    ${products}

    ${testimonials}    
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
