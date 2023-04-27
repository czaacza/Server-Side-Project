import { doGraphQLFetch } from '../graphql/fetch';
import {
  deleteUserAsAdminQuery,
  getUsersQuery,
  registerQuery,
  updateUserAsAdminQuery,
  updateUserQuery,
} from '../graphql/queries';
import { User } from '../interfaces/User';
import router from '../router';

export const initAdminEventListeners = (): void => {
  initAdminButtonEventListener();
  initAdminUserUpdateButtonEventListener();
  initDeleteButton();
  initAddNewUserButton();
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
  const userDetailsForm = document.querySelector(
    '#user-details-form'
  ) as HTMLFormElement;

  const displayUserDetails = (user: User) => {
    const passwordFieldContainer = document.getElementById(
      'password-field-container'
    );
    if (passwordFieldContainer) {
      passwordFieldContainer.innerHTML = '';
    }

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

  users.forEach((user) => {
    const listItem = document.querySelector(
      `.user-list-item[data-user-id="${user.id}"]`
    ) as HTMLElement;

    listItem.addEventListener('click', () => {
      displayUserDetails(user);
    });
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
      username: user.username,
      email: user.email,
      details: user.details,
    },
    updateUserAsAdminId: user.id,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    updateUserAsAdminQuery,
    variables,
    token
  );
  console.log(data);
  if (data) {
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
    console.log('userToUpdate', userToUpdate);

    const updateResult = await updateAdminUser(userToUpdate);
    if (updateResult.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(updateResult.error);
    }
  });
}

async function deleteUserAsAdmin(
  userId: string,
  adminToken: string
): Promise<{ success: boolean; error?: string }> {
  const variables = {
    deleteUserAsAdminId: userId,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    deleteUserAsAdminQuery,
    variables,
    adminToken
  );

  if (data.deleteUserAsAdmin) {
    return { success: true };
  } else {
    return {
      success: false,
      error: 'Failed to delete user. Please try again.',
    };
  }
}

export const initDeleteButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';

  const deleteUserButton = document.querySelector(
    '#btn-delete-user'
  ) as HTMLButtonElement;

  deleteUserButton.addEventListener('click', async () => {
    const userId = (document.querySelector('#user-id') as HTMLInputElement)
      .value;
    const result = await deleteUserAsAdmin(userId, adminToken);

    if (result.success) {
      // Show success message and remove user from the list
      showSuccessMessage('User deleted successfully');
      const userItem = document.querySelector(
        `[data-user-id="${userId}"]`
      ) as HTMLElement;
      userItem.remove();
      // Clear user details form
      const userDetailsForm = document.querySelector(
        '#user-details-form'
      ) as HTMLFormElement;
      userDetailsForm.classList.add('d-none');
    } else {
      // Show error message
      showErrorMessage(result.error);
    }
  });
};

async function addNewUser(
  userInput: any,
  adminToken: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const variables = {
    user: userInput,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    registerQuery,
    variables,
    adminToken
  );

  if (data.register && data.register.user) {
    return { success: true, user: data.register.user };
  } else {
    return {
      success: false,
      error: data.register.message || 'Failed to add user. Please try again.',
    };
  }
}

export const initAddNewUserButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';
  const addNewUserButton = document.querySelector(
    '#btn-add-user'
  ) as HTMLButtonElement;
  const userDetailsForm = document.querySelector(
    '#user-details-form'
  ) as HTMLFormElement;

  const clearUserDetailsForm = () => {
    userDetailsForm.reset();
    userDetailsForm.classList.add('d-none');
  };

  addNewUserButton.addEventListener('click', async () => {
    clearUserDetailsForm();
    userDetailsForm.classList.remove('d-none');
    togglePasswordField(true); // Show the password field

    userDetailsForm.onsubmit = async (event: Event) => {
      event.preventDefault();

      const newUser = {
        username: (document.querySelector('#user-username') as HTMLInputElement)
          .value,
        email: (document.querySelector('#user-email') as HTMLInputElement)
          .value,
        password: (document.querySelector('#user-password') as HTMLInputElement)
          .value,
        details: {
          firstName: (
            document.querySelector('#user-first-name') as HTMLInputElement
          ).value,
          lastName: (
            document.querySelector('#user-last-name') as HTMLInputElement
          ).value,
          phone: (document.querySelector('#user-phone') as HTMLInputElement)
            .value,
        },
      };

      const result = await addNewUser(newUser, adminToken);

      if (result.success && result.user) {
        // Show success message and add the new user to the users list
        showSuccessMessage();
        const usersList = document.querySelector('.users-list') as HTMLElement;
        usersList.innerHTML += generateUserListItem(result.user);

        togglePasswordField(false); // Hide the password field
      } else {
        // Show error message
        showErrorMessage(result.error);
      }
    };
  });
};

function showSuccessMessage(message?: string) {
  const successElement = document.getElementById('admin-success-message');
  if (successElement) {
    if (message) {
      successElement.innerText = message;
    }
    successElement.style.display = 'block';
    successElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      successElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      successElement.style.opacity = '0';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

function showErrorMessage(error: string | undefined) {
  const errorElement = document.getElementById('admin-error-message');
  errorElement!.innerText = error || 'An error occurred';

  console.log(errorElement);

  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      errorElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

export function filterUsers(users: User[], searchText: string): User[] {
  if (!searchText) {
    return users;
  }

  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return filteredUsers;
}

export const initSearchUsers = (users: User[]) => {
  const searchInput = document.querySelector(
    '#search-users'
  ) as HTMLInputElement;
  const usersList = document.querySelector('.users-list') as HTMLElement;

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value;
    const filteredUsers = filterUsers(users, searchText);
    usersList.innerHTML = generateUsersList(filteredUsers);
  });
};

export function generateUsersList(users: User[] | undefined) {
  if (!users) {
    return '';
  }

  return users
    .map(
      (user) => `
        <li class="list-group-item user-list-item user-list-item" data-user-id="${user.id}">
          <span class="user-name">${user.username}</span> - <span class="user-email">${user.email}</span>
        </li>
      `
    )
    .join('');
}

function generateUserListItem(user: User): string {
  return `
    <li class="list-group-item user-list-item" data-user-id="${user.id}">
      <span class="user-name">${user.username}</span> - <span class="user-email">${user.email}</span>
    </li>
  `;
}

function togglePasswordField(visible: boolean) {
  const usernameFieldContainer = document.getElementById(
    'username-field-container'
  );
  const passwordFieldContainer = document.getElementById(
    'password-field-container'
  );

  if (visible) {
    if (!passwordFieldContainer) {
      const passwordFieldHtml = `
        <div class="mb-3" id="password-field-container">
          <label for="user-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="user-password" required>
        </div>
      `;

      usernameFieldContainer?.insertAdjacentHTML('afterend', passwordFieldHtml);
    }
  } else {
    if (passwordFieldContainer) {
      passwordFieldContainer.remove();
    }
  }
}
