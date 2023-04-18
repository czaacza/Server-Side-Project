import navbar from '../components/navbar';
import hero from './hero';
import popup from './popup';
import products from './products';
import signin from './signin';
import testimonials from './testimonials';

export default function index(user?: any, books?: any, cart?: any): string {
  const modalHtml = `
    <div class="overlay"></div>

    ${navbar(user, cart)}

    ${hero()}

    ${popup()}
    
    ${signin()}

    ${products(books)}

    ${testimonials()}  
`;
  return modalHtml;
}
