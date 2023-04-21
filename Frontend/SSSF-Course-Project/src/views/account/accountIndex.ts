import { Cart } from '../../interfaces/Cart';
import navbar from '../components/navbar';
import accountSection from './accountSection';

export default function index(user?: any, cart?: Cart): string {
  const modalHtml = `

    ${navbar(user, cart)}

    ${accountSection(user)}
`;
  return modalHtml;
}
