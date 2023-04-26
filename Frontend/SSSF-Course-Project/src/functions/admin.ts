import { doGraphQLFetch } from '../graphql/fetch';
import { getUsersQuery } from '../graphql/queries';
import { User } from '../interfaces/User';
import router from '../router';

export const initAdminEventListeners = (): void => {
  initAdminButtonEventListener();
};

const initAdminButtonEventListener = (): void => {
  const adminButton =
    document.querySelector<HTMLButtonElement>('#btn-admin-panel');

  adminButton?.addEventListener('click', async (event: any) => {
    event.preventDefault();
    sessionStorage.setItem('adminAllowed', 'true');
    router.navigate('/account/admin');
  });
};

export const checkIfAdminAllowed = () => {
  if (sessionStorage.getItem('adminAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('adminAllowed');
    return true;
  }
};

export async function fetchUsers() {
  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    getUsersQuery,
    {}
  );
  if (data && data.users) {
    return data.users;
  }

  return undefined;
}

export const usersClickHandler = (users: User[]) => {
  const userList = document.querySelector('.users-list') as HTMLElement;
  const userDetailsForm = document.querySelector(
    '#user-details-form'
  ) as HTMLFormElement;

  const displayUserDetails = (user: User) => {
    userDetailsForm.classList.remove('d-none');

    (document.querySelector('#user-id') as HTMLInputElement).value = user.id;
    (document.querySelector('#user-username') as HTMLInputElement).value =
      user.username;
    (document.querySelector('#user-email') as HTMLInputElement).value =
      user.email;
    (document.querySelector('#user-first-name') as HTMLInputElement).value =
      user.details!.firstName;
    (document.querySelector('#user-last-name') as HTMLInputElement).value =
      user.details!.lastName;
    (document.querySelector('#user-phone') as HTMLInputElement).value =
      user.details!.phone;
  };

  userList.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('user-list-item')) {
      const userId = target.dataset.userId as string;
      const user = users.find((user) => user.id === userId);
      if (user) {
        displayUserDetails(user);
      }
    }
  });
};

async function updateAdminUser(
  user: User
): Promise<{ success: boolean; user?: User; error?: string }> {
  const token = sessionStorage.getItem('token')?.slice(1, -1);

  if (
    !user.email ||
    user.email.indexOf('@') === -1 ||
    user.email.indexOf('.') === -1
  ) {
    return { success: false, error: 'Email is required' };
  }

  if (!token) {
    return { success: false, error: 'User not logged in' };
  }

  const variables = {
    user: {
      id: user.id,
      email: user.email,
      details: user.details,
    },
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    updateUserQuery,
    variables,
    token
  );
  if (data.updateUser) {
    return { success: true, user: data.updateUser };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAdminUserUpdateButtonEventListener() {
  const updateUserButton = document.querySelector('#btn-update-user');

  updateUserButton?.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const userId =
      document.querySelector<HTMLInputElement>('#user-id')?.value || '';
    const username =
      document.querySelector<HTMLInputElement>('#user-username')?.value || '';
    const email =
      document.querySelector<HTMLInputElement>('#user-email')?.value || '';
    const firstName =
      document.querySelector<HTMLInputElement>('#user-first-name')?.value || '';
    const lastName =
      document.querySelector<HTMLInputElement>('#user-last-name')?.value || '';
    const phone =
      document.querySelector<HTMLInputElement>('#user-phone')?.value || '';

    const userToUpdate = {
      id: userId,
      username,
      email,
      details: {
        firstName,
        lastName,
        phone,
      },
    };

    const updateResult = await updateAdminUser(userToUpdate);
    if (updateResult.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(updateResult.error);
    }
  });
}

function showSuccessMessage() {
  console.log('success');
  // Similar to the previous function, show a success message here
}

function showErrorMessage(error: string | undefined) {
  console.log('errorq');
  // Similar to the previous function, show an error message here
}
