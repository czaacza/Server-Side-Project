import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { UserFromToken, UserOutput } from '../interfaces/User';

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_GRAPHQL_URL}`, {
      query: `
          mutation Login($credentials: Credentials!) {
            login(credentials: $credentials) {
              token              
            }
          }
        `,
      variables: {
        credentials: { username, password },
      },
    });

    if (response.status === 200 && response.data.data.login) {
      sessionStorage.setItem(
        'token',
        JSON.stringify(response.data.data.login.token)
      );
      return { success: true, user: response.data.data.login };
    } else {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout(): Promise<void> {
  console.log('logout() called');
  sessionStorage.removeItem('user');
  // await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
}

export function getStoredUser(): any | undefined {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  try {
    const userFromToken: UserFromToken = jwt_decode(token);
    return userFromToken;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
