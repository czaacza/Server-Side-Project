import navbar from '../components/navbar';
import cartSection from './cartSection';

export default function index(user?: any, books?: any): string {
  const modalHtml = `

    ${navbar(user)}

    ${cartSection()}
`;
  return modalHtml;
}
