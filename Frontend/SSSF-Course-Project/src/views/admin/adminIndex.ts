import { Cart } from '../../interfaces/Cart';
import { User } from '../../interfaces/User';
import navbar from '../components/navbar';

export default function index(user?: User, cart?: Cart): string {
  const modalHtml = `

    ${navbar(user, cart)}


`;
  return modalHtml;
}
