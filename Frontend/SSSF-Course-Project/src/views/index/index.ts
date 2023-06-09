import navbar from '../components/navbar';
import hero from './hero';
import popup from '../components/popup';
import products from './products';
import signin from '../components/signin';
import testimonials from './testimonials';

export default function index(user?: any, books?: any, cart?: any): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${hero()}

    

    ${products(books)}

    ${testimonials()}  
`;
  return modalHtml;
}
