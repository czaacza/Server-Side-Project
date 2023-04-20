const loginQuery = `
      mutation Login($credentials: Credentials!) {
        login(credentials: $credentials) {
          token
          message
          user {
            id
            username
            email
          }
        }
      }
    `;

export { loginQuery };
